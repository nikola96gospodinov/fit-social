CREATE OR REPLACE FUNCTION add_workout_with_exercises_and_sets (
  p_started TIMESTAMP WITH TIME ZONE,
  p_exercises JSONB[],
  p_sets JSONB[],
  p_title TEXT DEFAULT NULL
) RETURNS VOID AS $$
DECLARE
    v_workout_id UUID;
BEGIN
    -- Insert the workout and get the workout ID
    INSERT INTO public.workouts (started, user_id, title)
    VALUES (p_started, auth.uid(), p_title)
    RETURNING id INTO v_workout_id;

    -- Create temporary table for inserted exercises
    CREATE TEMP TABLE temp_inserted_exercises AS
    WITH inserted_exercises AS (
        INSERT INTO public.workout_exercises (
            exercise_id,
            workout_id,
            id
        )
        SELECT
            (exercise->>'exercise_id')::UUID,
            v_workout_id,
            (exercise->>'id')::UUID
        FROM unnest(p_exercises) AS exercise
        RETURNING id, exercise_id
    )
    SELECT * FROM inserted_exercises;

    -- Insert the sets using the IDs from the temporary table
    INSERT INTO public.exercise_sets (
        workout_exercise_id,
        reps,
        weight,
        is_done,
        distance,
        time
    )
    SELECT
        (SELECT ie.id
         FROM temp_inserted_exercises ie
         WHERE ie.exercise_id = (set->>'exercise_id')::UUID),
        CASE 
            WHEN jsonb_typeof(set->'reps') = 'null' THEN NULL 
            ELSE (set->>'reps')::INTEGER 
        END,
        CASE 
            WHEN jsonb_typeof(set->'weight') = 'null' THEN NULL 
            ELSE (set->>'weight')::NUMERIC 
        END,
        COALESCE((set->>'is_done')::BOOLEAN, true),
        CASE 
            WHEN jsonb_typeof(set->'distance') = 'null' THEN NULL 
            ELSE (set->>'distance')::NUMERIC 
        END,
        CASE 
            WHEN jsonb_typeof(set->'time') = 'null' THEN NULL 
            ELSE (set->>'time')::INTEGER 
        END
    FROM unnest(p_sets) AS set
    WHERE (set->>'exercise_id') IS NOT NULL
    AND (
        jsonb_typeof(set->'reps') != 'null' OR
        jsonb_typeof(set->'weight') != 'null' OR
        jsonb_typeof(set->'distance') != 'null' OR
        jsonb_typeof(set->'time') != 'null'
    );

    -- Drop the temporary table
    DROP TABLE temp_inserted_exercises;
END; $$ LANGUAGE plpgsql;
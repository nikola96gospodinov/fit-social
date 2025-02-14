CREATE OR REPLACE FUNCTION update_workout(
  p_workout_id UUID,
  p_workout_title TEXT,
  p_workout_started TIMESTAMP,
  p_workout_ended TIMESTAMP,
  p_exercises_data JSONB,
  p_sets_data JSONB
) RETURNS void AS $$
DECLARE
  exercise_record RECORD;
  set_record RECORD;
BEGIN
    -- Create temporary table for exercise mappings
    CREATE TEMP TABLE temp_exercise_ids (
      temp_id UUID,
      actual_id UUID
    ) ON COMMIT DROP;

    -- 1. Update workout
    UPDATE workouts 
    SET 
      title = p_workout_title,
      started = p_workout_started,
      ended = p_workout_ended
    WHERE id = p_workout_id;

    -- 2. Delete exercises that aren't in the new data
    DELETE FROM workout_exercises
    WHERE workout_id = p_workout_id
    AND id NOT IN (
      SELECT (e->>'id')::uuid
      FROM jsonb_array_elements(p_exercises_data) e
      WHERE e->>'id' IS NOT NULL
    );

    -- 3. Insert only new exercises and store their IDs
    FOR exercise_record IN
      SELECT value, value->>'id' as id, value->>'exercise_id' as exercise_id
      FROM jsonb_array_elements(p_exercises_data)
      WHERE NOT EXISTS (
        SELECT 1 
        FROM workout_exercises we 
        WHERE we.id = (value->>'id')::uuid
        AND we.workout_id = p_workout_id
      )
    LOOP
      WITH inserted_exercise AS (
        INSERT INTO workout_exercises (
          workout_id,
          exercise_id
        )
        VALUES (
          p_workout_id,
          exercise_record.exercise_id::UUID
        )
        RETURNING id
      )
      INSERT INTO temp_exercise_ids (temp_id, actual_id)
      SELECT (exercise_record.id)::uuid, id
      FROM inserted_exercise;
    END LOOP;

    -- 4. Delete sets that aren't in the new data
    DELETE FROM exercise_sets
    WHERE workout_exercise_id IN (
      SELECT id FROM workout_exercises WHERE workout_id = p_workout_id
    )
    AND id NOT IN (
      SELECT (s->>'id')::uuid
      FROM jsonb_array_elements(p_sets_data) s
      WHERE s->>'id' IS NOT NULL
    );

    -- 5. Update or insert sets
    FOR set_record IN 
      SELECT value, value->>'id' as id, value->>'weight' as weight, 
             value->>'reps' as reps, value->>'workout_exercise_id' as workout_exercise_id,
             value->>'is_done' as is_done, value->>'time' as time, value->>'distance' as distance
      FROM jsonb_array_elements(p_sets_data)
    LOOP
      UPDATE exercise_sets
      SET 
        weight = (set_record.weight)::float4,
        reps = (set_record.reps)::numeric,
        is_done = (set_record.is_done)::boolean,
        time = (set_record.time)::numeric,
        distance = (set_record.distance)::float4
      WHERE id = (set_record.id)::uuid
      AND EXISTS (
        SELECT 1 FROM exercise_sets 
        WHERE id = (set_record.id)::uuid
      );
      
      -- If no row was updated, insert new set
      IF NOT FOUND THEN
        INSERT INTO exercise_sets (
          id,
          workout_exercise_id,
          weight,
          reps,
          is_done,
          time,
          distance
        )
        VALUES (
          (set_record.id)::uuid,
          COALESCE(
            (SELECT actual_id 
             FROM temp_exercise_ids 
             WHERE temp_id = (set_record.workout_exercise_id)::uuid),
            (set_record.workout_exercise_id)::uuid
          ),
          (set_record.weight)::float4,
          (set_record.reps)::numeric,
          (set_record.is_done)::boolean,
          (set_record.time)::numeric,
          (set_record.distance)::float4
        );
      END IF;
    END LOOP;
    -- Temporary table will be dropped automatically due to ON COMMIT DROP
END;
$$ LANGUAGE plpgsql;
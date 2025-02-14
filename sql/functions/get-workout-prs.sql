CREATE OR REPLACE FUNCTION get_workout_prs(
  current_workout_id UUID,
  current_workout_ended TIMESTAMP
) 
RETURNS TABLE (set_id UUID) AS $$
BEGIN
  RETURN QUERY
  WITH previous_workouts AS (
    SELECT w.*
    FROM workouts w
    WHERE w.user_id = auth.uid() 
      AND w.ended < current_workout_ended
  ),
  
  previous_maxes AS (
    SELECT 
      we.exercise_id,
      e.measurement_type,
      CASE 
        WHEN e.measurement_type = 'reps_and_added_weight' THEN 
          MAX(CASE 
            WHEN es.weight IS NOT NULL AND es.reps IS NOT NULL 
            THEN es.weight * POWER(1.0278, es.reps)
            ELSE 0
          END)
        WHEN e.measurement_type = 'reps_and_subtracted_weight' THEN 
          MIN(COALESCE(es.weight, 999999))
        WHEN e.measurement_type = 'time_and_distance' THEN 
          MIN(CASE 
            WHEN NULLIF(es.distance, 0) IS NOT NULL AND es.time IS NOT NULL 
            THEN es.time::float / es.distance
            ELSE NULL
          END)
        WHEN e.measurement_type = 'time_and_added_weight' THEN 
          MAX(COALESCE(es.time, 0) * COALESCE(es.weight, 0))
        WHEN e.measurement_type = 'time_only' THEN 
          MAX(COALESCE(es.time, 0))
        WHEN e.measurement_type = 'reps_only' THEN 
          MAX(COALESCE(es.reps, 0))
        ELSE 0
      END as best_score
    FROM previous_workouts pw
    JOIN workout_exercises we ON pw.id = we.workout_id
    JOIN exercise_sets es ON we.id = es.workout_exercise_id
    JOIN exercises e ON we.exercise_id = e.id
    GROUP BY we.exercise_id, e.measurement_type
  ),
  
  current_workout_sets AS (
    SELECT 
      we.exercise_id,
      e.measurement_type,
      es.id as id_set,
      CASE 
        WHEN e.measurement_type = 'reps_and_added_weight' THEN 
          CASE 
            WHEN es.weight IS NOT NULL AND es.reps IS NOT NULL 
            THEN es.weight * POWER(1.0278, es.reps)
            ELSE 0
          END
        WHEN e.measurement_type = 'reps_and_subtracted_weight' THEN 
          COALESCE(es.weight, 999999)
        WHEN e.measurement_type = 'time_and_distance' THEN 
          CASE 
            WHEN NULLIF(es.distance, 0) IS NOT NULL AND es.time IS NOT NULL 
            THEN es.time::float / es.distance
            ELSE NULL
          END
        WHEN e.measurement_type = 'time_and_added_weight' THEN 
          COALESCE(es.time, 0) * COALESCE(es.weight, 0)
        WHEN e.measurement_type = 'time_only' THEN 
          COALESCE(es.time, 0)
        WHEN e.measurement_type = 'reps_only' THEN 
          COALESCE(es.reps, 0)
        ELSE 0
      END as score
    FROM workouts w
    JOIN workout_exercises we ON w.id = we.workout_id
    JOIN exercise_sets es ON we.id = es.workout_exercise_id
    JOIN exercises e ON we.exercise_id = e.id
    WHERE w.id = current_workout_id
  ),
  
  best_current_sets AS (
    SELECT DISTINCT ON (exercise_id)
      exercise_id,
      measurement_type,
      score as best_score,
      id_set
    FROM current_workout_sets
    WHERE score IS NOT NULL
    ORDER BY 
      exercise_id,
      CASE 
        WHEN measurement_type IN ('time_and_distance', 'reps_and_subtracted_weight') 
        THEN score
        ELSE -score
      END ASC
  )
  
  SELECT bcs.id_set
  FROM best_current_sets bcs
  LEFT JOIN previous_maxes pm ON pm.exercise_id = bcs.exercise_id
  WHERE 
    bcs.best_score IS NOT NULL
    AND (
      pm.best_score IS NULL  -- First time doing the exercise
      OR (
        -- Types where lower score is better
        (bcs.measurement_type IN ('time_and_distance', 'reps_and_subtracted_weight') 
         AND bcs.best_score < COALESCE(pm.best_score, 999999))
        -- Types where higher score is better
        OR (bcs.measurement_type NOT IN ('time_and_distance', 'reps_and_subtracted_weight') 
            AND bcs.best_score > COALESCE(pm.best_score, 0))
      )
    );
END;
$$ LANGUAGE plpgsql;
CREATE OR REPLACE FUNCTION get_previous_sets_for_exercise(
  current_exercise_id TEXT
) RETURNS TABLE (
  weight REAL,
  reps NUMERIC,
  distance REAL,
  "time" NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  WITH last_workout AS (
    -- First find the last workout that contained this exercise
    SELECT w.id, w.ended
    FROM workouts w
    JOIN workout_exercises we ON we.workout_id = w.id
    JOIN exercises e ON we.exercise_id = e.id
    WHERE e.id = current_exercise_id::UUID AND w.user_id = auth.uid()
    ORDER BY w.ended DESC
    LIMIT 1
  )

  -- Then get all sets from that workout for this exercise
    SELECT es.weight, es.reps, es.distance, es.time::NUMERIC
  FROM exercise_sets es
  JOIN workout_exercises we ON we.id = es.workout_exercise_id
  JOIN exercises e ON we.exercise_id = e.id
  JOIN last_workout lw ON lw.id = we.workout_id
  WHERE e.id = current_exercise_id::UUID;
END;
$$ LANGUAGE plpgsql;
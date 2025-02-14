CREATE OR REPLACE FUNCTION like_workout(
  p_workout_id UUID
) RETURNS void AS $$
DECLARE 
  v_receiver_id UUID;
BEGIN
  SELECT user_id INTO v_receiver_id
  FROM workouts
  WHERE id = p_workout_id;

  INSERT INTO likes (workout_id, user_id)
  VALUES (p_workout_id, auth.uid());

  -- You don't want to create a notification for yourself
  IF v_receiver_id != auth.uid() THEN
    INSERT INTO notifications (notification_type, sender_id, receiver_id)
    VALUES ('workout_like', auth.uid(), v_receiver_id);
  END IF;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION unlike_workout (
  p_workout_id UUID
) RETURNS void AS $$
DECLARE 
  v_receiver_id UUID;
BEGIN
  SELECT user_id INTO v_receiver_id
  FROM workouts
  WHERE id = p_workout_id;

  DELETE FROM likes
  WHERE workout_id = p_workout_id
    AND user_id = auth.uid();

  DELETE FROM notifications
    WHERE notification_type = 'workout_like'
      AND sender_id = auth.uid()
      AND receiver_id = v_receiver_id;
END;
$$ LANGUAGE plpgsql;
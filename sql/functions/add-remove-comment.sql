CREATE OR REPLACE FUNCTION add_comment (
  p_workout_id UUID,
  p_content TEXT
) RETURNS void AS $$
DECLARE 
  v_receiver_id UUID;
BEGIN
  SELECT user_id INTO v_receiver_id
  FROM workouts
  WHERE id = p_workout_id;

  INSERT INTO comments (content, user_id, workout_id)
  VALUES (p_content, auth.uid(), p_workout_id);

  -- You don't want to create a notification for yourself
  IF v_receiver_id != auth.uid() THEN
    INSERT INTO notifications (notification_type, sender_id, receiver_id)
    VALUES ('workout_comment', auth.uid(), v_receiver_id);
  END IF;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION remove_comment (
  p_comment_id UUID
) RETURNS void AS $$
DECLARE
  v_receiver_id UUID;
BEGIN
  SELECT workouts.user_id INTO v_receiver_id
  FROM workouts
  JOIN comments ON workout.id = comments.workout_id;

  DELETE FROM comments
  WHERE id = p_comment_id;

  DELETE FROM notifications
  WHERE notification_type = 'workout_comment'
    AND sender_id = auth.uid()
    AND receiver_id = v_receiver_id;
END;
$$ LANGUAGE plpgsql;
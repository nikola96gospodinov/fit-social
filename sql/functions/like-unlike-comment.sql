CREATE OR REPLACE FUNCTION like_comment (
  p_comment_id UUID
) RETURNS void AS $$
DECLARE
  v_receiver_id UUID;
BEGIN
  SELECT user_id into v_receiver_id
  FROM comments
  WHERE id = p_comment_id;

  INSERT INTO comment_likes (comment_id, user_id)
  VALUES (p_comment_id, auth.uid());

  -- You don't want to create a notification for yourself
  IF v_receiver_id != auth.uid() THEN
    INSERT INTO notifications (notification_type, sender_id, receiver_id)
    VALUES ('comment_like', auth.uid(), v_receiver_id);
  END IF;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION unlike_comment (
  p_comment_id UUID
) RETURNS void AS $$
DECLARE
  v_receiver_id UUID;
  v_comment_like_id UUID;
BEGIN
  SELECT user_id INTO v_receiver_id
  FROM comments
  WHERE id = p_comment_id;

  SELECT id INTO v_comment_like_id
  FROM comment_likes
  WHERE comment_id = p_comment_id
  AND user_id = auth.uid()
  LIMIT 1;

  DELETE FROM comment_likes
  WHERE id = v_comment_like_id;

  DELETE FROM notifications
  WHERE notification_type = 'comment_like'
    AND sender_id = auth.uid()
    AND receiver_id = v_receiver_id;
END;
$$ LANGUAGE plpgsql;
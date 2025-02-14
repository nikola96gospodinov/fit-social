-- Follow
CREATE OR REPLACE FUNCTION follow_account(
  p_follower_id UUID,
  p_followed_id UUID
) RETURNS void AS $$
DECLARE
  is_followed_public BOOLEAN;
  notification_type notification_type;
BEGIN
  -- Checking if the account that is followed is public
  SELECT is_public INTO is_followed_public FROM profiles WHERE p_followed_id = id;

  -- Insert a follow based on whether the followed's profile is public or not
  IF is_followed_public THEN
    INSERT INTO follows(follower_id, followed_id, status, accepted_at)
    VALUES (p_follower_id, p_followed_id, 'accepted', now()::timestamp with time zone);
  ELSE
    INSERT INTO follows(follower_id, followed_id, status)
    VALUES (p_follower_id, p_followed_id, 'pending');
  END IF;

  -- Determine the notification type
  notification_type := case
    WHEN is_followed_public THEN 'started_following'
    ELSE 'follow_request'
  END;

  -- Insert a notification
  INSERT INTO notifications(created_at, is_read, notification_type, receiver_id, sender_id)
  VALUES (now()::timestamp with time zone, FALSE, notification_type, p_followed_id, p_follower_id);
END;
$$ LANGUAGE plpgsql;

-- Unfollow
CREATE OR REPLACE FUNCTION unfollow_account(
  p_follower_id UUID,
  p_followed_id UUID
) RETURNS void AS $$
BEGIN 
  DELETE FROM follows
  WHERE p_follower_id = follower_id
    AND p_followed_id = followed_id;

  DELETE FROM notifications
  WHERE p_follower_id = sender_id
    AND p_followed_id = receiver_id
    AND notification_type IN ('started_following', 'follow_request');
END;
$$ LANGUAGE plpgsql;

-- Accept follow
CREATE OR REPLACE FUNCTION accept_follow_request(
  p_follower_id UUID
) RETURNS void AS $$
BEGIN
  UPDATE follows
  SET accepted_at = NOW(), status = 'accepted'
  WHERE follower_id = p_follower_id
    AND followed_id = auth.uid();

  DELETE FROM notifications
  WHERE notification_type = 'follow_request'
   AND sender_id = p_follower_id
   AND receiver_id = auth.uid();

  INSERT INTO notifications(notification_type, sender_id, receiver_id)
  VALUES ('follow_request_accepted', auth.uid(), p_follower_id);
END;
$$ LANGUAGE plpgsql;
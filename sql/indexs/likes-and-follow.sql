-- follows
CREATE UNIQUE INDEX unique_follow_relationship
ON follows (follower_id, followed_id, status);

-- likes
CREATE UNIQUE INDEX unique_like
ON likes (workout_id, user_id);

-- comment_likes
CREATE UNIQUE INDEX unique_comment_like
ON comment_likes (comment_id, user_id);

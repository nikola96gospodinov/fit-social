alter policy "Enable delete for users based on user_id"
on "public"."comment_likes"
to authenticated
using (
  (( SELECT auth.uid() AS uid) = user_id)
);

alter policy "Users can add comment likes based on profile visibility"
on "public"."comment_likes"
to authenticated
with check (
      (EXISTS ( SELECT 1
   FROM (((comments c
     JOIN workouts w ON ((c.workout_id = w.id)))
     JOIN profiles p ON ((w.user_id = p.id)))
     LEFT JOIN follows f ON (((f.followed_id = p.id) AND (f.follower_id = auth.uid()) AND (f.status = 'accepted'::follow_status))))
  WHERE ((c.id = comment_likes.comment_id) AND ((p.is_public = true) OR (f.follower_id = auth.uid()) OR (w.user_id = auth.uid())))))
);

alter policy "Users can see likes based on profile visibility"
on "public"."comment_likes"
to authenticated
using (
      (EXISTS ( SELECT 1
   FROM (((comments c
     JOIN workouts w ON ((c.workout_id = w.id)))
     JOIN profiles p ON ((w.user_id = p.id)))
     LEFT JOIN follows f ON (((f.followed_id = p.id) AND (f.follower_id = auth.uid()) AND (f.status = 'accepted'::follow_status))))
  WHERE ((c.id = comment_likes.comment_id) AND ((p.is_public = true) OR (f.follower_id = auth.uid()) OR (w.user_id = auth.uid())))))
);
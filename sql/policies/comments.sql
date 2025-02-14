alter policy "Comments can be accessed based on profile visibility"
on "public"."comments"
to authenticated
using (
      (EXISTS ( SELECT 1
   FROM (workouts w
     JOIN profiles p ON ((p.id = w.user_id)))
  WHERE ((w.id = comments.workout_id) AND ((p.is_public = true) OR (p.id = auth.uid()) OR (EXISTS ( SELECT 1
           FROM follows f
          WHERE ((f.follower_id = auth.uid()) AND (f.followed_id = w.user_id) AND (f.status = 'accepted'::follow_status))))))))
);

alter policy "Comments can be added based on profile visibility"
on "public"."comments"
to authenticated
with check (
      (EXISTS ( SELECT 1
   FROM (workouts w
     JOIN profiles p ON ((p.id = w.user_id)))
  WHERE ((w.id = comments.workout_id) AND ((p.is_public = true) OR (p.id = auth.uid()) OR (EXISTS ( SELECT 1
           FROM follows f
          WHERE ((f.follower_id = auth.uid()) AND (f.followed_id = w.user_id) AND (f.status = 'accepted'::follow_status))))))))
);

alter policy "Only users who have added a comment can update it"
on "public"."comments"
to authenticated
using (
      (( SELECT auth.uid() AS uid) = user_id)
);

alter policy "Users can only delete their comments or workout owners"
on "public"."comments"
to authenticated
using (
      ((( SELECT auth.uid() AS uid) = user_id) OR (EXISTS ( SELECT 1
   FROM workouts w
  WHERE ((w.id = comments.workout_id) AND (w.user_id = auth.uid())))))
);
alter policy "Likes added on profile settings"
on "public"."likes"
to authenticated
with check (
      (EXISTS ( SELECT 1
   FROM (workouts w
     JOIN profiles p ON ((p.id = w.user_id)))
  WHERE ((w.id = likes.workout_id) AND ((p.is_public = true) OR (p.id = auth.uid()) OR (EXISTS ( SELECT 1
           FROM follows f
          WHERE ((f.follower_id = auth.uid()) AND (f.followed_id = w.user_id) AND (f.status = 'accepted'::follow_status))))))))
);

alter policy "Likes can be accessed based on profile visibility"
on "public"."likes"
to authenticated
using (
  (EXISTS ( SELECT 1
   FROM (workouts w
     JOIN profiles p ON ((p.id = w.user_id)))
  WHERE ((w.id = likes.workout_id) AND ((p.is_public = true) OR (p.id = auth.uid()) OR (EXISTS ( SELECT 1
           FROM follows f
          WHERE ((f.follower_id = auth.uid()) AND (f.followed_id = w.user_id) AND (f.status = 'accepted'::follow_status))))))))
);

alter policy "Only users who liked can delete (unlike) a like"
on "public"."likes"
to authenticated
using (
  (( SELECT auth.uid() AS uid) = user_id)
);
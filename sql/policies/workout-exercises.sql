alter policy "Enable delete for users based on user_id"
on "public"."workout_exercises"
to authenticated
using (
      (EXISTS ( SELECT 1
   FROM workouts
  WHERE ((workouts.id = workout_exercises.workout_id) AND (EXISTS ( SELECT 1
           FROM profiles
          WHERE ((( SELECT auth.uid() AS uid) = profiles.id) AND (profiles.id = workouts.user_id)))))))
);

alter policy "Enable insert for users based on user_id and workout_id"
on "public"."workout_exercises"
to authenticated
with check (
  (EXISTS ( SELECT 1
   FROM workouts
  WHERE ((workouts.id = workout_exercises.workout_id) AND (EXISTS ( SELECT 1
           FROM profiles
          WHERE ((( SELECT auth.uid() AS uid) = profiles.id) AND (profiles.id = workouts.user_id)))))))
);

alter policy "Enable read access depending on profile visibility"
on "public"."workout_exercises"
to authenticated
using (
  (EXISTS ( SELECT 1
   FROM (workouts w
     JOIN profiles p ON ((w.user_id = p.id)))
  WHERE ((w.id = workout_exercises.workout_id) AND ((p.is_public = true) OR (p.id = auth.uid()) OR (EXISTS ( SELECT 1
           FROM follows f
          WHERE ((f.follower_id = auth.uid()) AND (f.followed_id = p.id) AND (f.status = 'accepted'::follow_status))))))))
);

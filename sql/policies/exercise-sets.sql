alter policy "Enable delete for users based on user_id"
on "public"."exercise_sets"
to authenticated
using (
      (EXISTS ( SELECT 1
   FROM (workout_exercises we
     JOIN workouts w ON ((we.workout_id = w.id)))
  WHERE ((we.id = exercise_sets.workout_exercise_id) AND (EXISTS ( SELECT 1
           FROM profiles
          WHERE ((( SELECT auth.uid() AS uid) = profiles.id) AND (profiles.id = w.user_id)))))))
);

alter policy "Enable insert for users based on user_id"
on "public"."exercise_sets"
to authenticated
with check (
      (EXISTS ( SELECT 1
   FROM (workout_exercises we
     JOIN workouts w ON ((we.workout_id = w.id)))
  WHERE ((we.id = exercise_sets.workout_exercise_id) AND (w.user_id = auth.uid()))))
);

alter policy "Enable read access based on profile visibility"
on "public"."exercise_sets"
to authenticated
using (
      (EXISTS ( SELECT 1
   FROM ((workout_exercises we
     JOIN workouts w ON ((we.workout_id = w.id)))
     JOIN profiles p ON ((w.user_id = p.id)))
  WHERE ((we.id = exercise_sets.workout_exercise_id) AND ((p.is_public = true) OR (p.id = auth.uid()) OR (EXISTS ( SELECT 1
           FROM follows f
          WHERE ((f.follower_id = auth.uid()) AND (f.followed_id = p.id) AND (f.status = 'accepted'::follow_status))))))))
);

alter policy "Enable update for users based on email"
on "public"."exercise_sets"
to public
using (
      (EXISTS ( SELECT 1
   FROM (workout_exercises we
     JOIN workouts w ON ((we.workout_id = w.id)))
  WHERE ((we.id = exercise_sets.workout_exercise_id) AND (EXISTS ( SELECT 1
           FROM profiles
          WHERE ((( SELECT auth.uid() AS uid) = profiles.id) AND (profiles.id = w.user_id)))))))
);
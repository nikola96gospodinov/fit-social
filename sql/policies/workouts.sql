alter policy "Enable delete for users based on user_id"
on "public"."workouts"
to authenticated
using (
      (EXISTS ( SELECT 1
   FROM profiles
  WHERE ((( SELECT auth.uid() AS uid) = profiles.id) AND (profiles.id = workouts.user_id))))
);

alter policy "Enable insert for users based on user_id"
on "public"."workouts"
to authenticated
with check (
      (EXISTS ( SELECT 1
   FROM profiles
  WHERE ((( SELECT auth.uid() AS uid) = profiles.id) AND (profiles.id = workouts.user_id))))
);

alter policy "Enable read access for all users"
on "public"."workouts"
to authenticated
using (
      (EXISTS ( SELECT 1
   FROM profiles p
  WHERE ((p.id = workouts.user_id) AND ((p.is_public = true) OR (p.id = auth.uid()) OR (EXISTS ( SELECT 1
           FROM follows f
          WHERE ((f.follower_id = auth.uid()) AND (f.followed_id = p.id) AND (f.status = 'accepted'::follow_status))))))))
);

alter policy "Only owners of the workout can edit it"
on "public"."workouts"
to authenticated
using (
      (EXISTS ( SELECT 1
   FROM profiles
  WHERE ((( SELECT auth.uid() AS uid) = profiles.id) AND (profiles.id = workouts.user_id))))
);

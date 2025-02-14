alter policy "Enable read access for all users"
on "public"."follows"
to authenticated
using (
  true
);

alter policy "Only followed can accept a request"
on "public"."follows"
to authenticated
using (
  (( SELECT auth.uid() AS uid) = followed_id)
);

alter policy "Only users who want to unfollow can delete"
on "public"."follows"
to authenticated
using (
  (auth.uid() = follower_id)
);

alter policy "Users can follow and send follow requests"
on "public"."follows"
to authenticated
with check (
      ((auth.uid() = follower_id) AND (EXISTS ( SELECT 1
   FROM profiles
  WHERE (profiles.id = follows.followed_id))) AND (((EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.id = follows.followed_id) AND (profiles.is_public = false)))) AND (status = 'pending'::follow_status) AND (accepted_at IS NULL)) OR (EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.id = follows.followed_id) AND (profiles.is_public = true))))))
);

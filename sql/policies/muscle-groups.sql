alter policy "Everyone can access"
on "public"."muscle_groups"
to authenticated
using (
  true
);
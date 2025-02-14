alter policy "Everyone can access"
on "public"."exercises"
to authenticated
using (
  true
);
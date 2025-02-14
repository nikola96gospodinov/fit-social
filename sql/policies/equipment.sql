alter policy "Everyone can access"
on "public"."equipment"
to authenticated
using (
  true
);
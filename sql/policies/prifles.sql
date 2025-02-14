alter policy "Public profiles are viewable by everyone."
on "public"."profiles"
to public
using (
  true
);

alter policy "Users can insert their own profile."
on "public"."profiles"
to public
with check (
  (( SELECT auth.uid() AS uid) = id)
);

alter policy "Users can update own profile."
on "public"."profiles"
to public
using (
  (( SELECT auth.uid() AS uid) = id)
);
CREATE
OR REPLACE FUNCTION public.handle_new_user () RETURNS TRIGGER
SET
  search_path = '' AS $$
declare
  unique_handle text;
begin
    unique_handle := lower(split_part(new.email, '@', 1));

    WHILE EXISTS (SELECT 1 FROM public.profiles where handle = unique_handle) LOOP
      unique_handle := unique_handle || '_' || (SELECT count(*) FROM public.profiles WHERE handle LIKE (unique_handle || '_%'));
    END LOOP;

    insert into public.profiles (id, handle, full_name, is_public)
    values (new.id, unique_handle, new.raw_user_meta_data->>'full_name', true);
    return new;
end; 
$$ LANGUAGE plpgsql SECURITY DEFINER;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
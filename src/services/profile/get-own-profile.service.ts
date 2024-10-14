import { supabase } from "@/src/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { PROFILE_QUERY_KEY } from "./profile-keys";
import { useGetSessionFromQueryClient } from "@/src/hooks/use-get-session-from-query-client";

export const getOwnProfile = async () => {
  const { data: user, error: userError } = await supabase.auth.getUser();

  if (userError) {
    throw new Error(userError.message);
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.user.id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const useGetOwnProfile = () => {
  const session = useGetSessionFromQueryClient();

  return useQuery({
    queryKey: [PROFILE_QUERY_KEY, session?.user.id],
    queryFn: getOwnProfile,
  });
};

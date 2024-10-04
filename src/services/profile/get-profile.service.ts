import { supabase } from "@/src/lib/supabase";
import { useQuery } from "@tanstack/react-query";

const GET_PROFILE_QUERY_KEY = "profile";

const getProfile = async () => {
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

  return {
    ...data,
    created_at: user.user.created_at,
  };
};

export const useGetProfile = () => {
  return useQuery({
    queryKey: [GET_PROFILE_QUERY_KEY],
    queryFn: () => getProfile(),
  });
};

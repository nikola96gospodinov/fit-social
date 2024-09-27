import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

const PROFILE_QUERY_KEY = "profile";

const getUser = async () => {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  return data.user;
};

export const useGetProfile = () => {
  return useQuery({
    queryKey: [PROFILE_QUERY_KEY],
    queryFn: getUser,
  });
};

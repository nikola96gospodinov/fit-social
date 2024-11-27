import { supabase } from "@/src/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { PROFILE_QUERY_KEY } from "./profile-keys";
import { useGetSession } from "../auth/get-session.service";

export const getProfile = async (userID?: string) => {
  const { data: user, error: userError } = await supabase.auth.getUser();

  if (userError) {
    throw new Error(userError.message);
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userID ?? user.user.id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const useGetProfile = (userID?: string) => {
  const { data: session } = useGetSession();

  return useQuery({
    queryKey: [PROFILE_QUERY_KEY, userID ?? session?.user.id],
    queryFn: () => getProfile(userID),
  });
};

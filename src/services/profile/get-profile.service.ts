import { supabase } from "@/src/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { PROFILE_QUERY_KEY } from "./profile-keys";
import { useLocalSearchParams } from "expo-router";
import { useGetSessionFromQueryClient } from "@/src/hooks/use-get-session-from-query-client";

export const getProfile = async (handle?: string) => {
  const { data: user, error: userError } = await supabase.auth.getUser();

  if (userError) {
    throw new Error(userError.message);
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq(handle ? "handle" : "id", handle ?? user.user.id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const useGetProfile = () => {
  const session = useGetSessionFromQueryClient();
  const { handle } = useLocalSearchParams();

  return useQuery({
    queryKey: [PROFILE_QUERY_KEY, session?.user.id, handle],
    queryFn: () => getProfile(handle as string),
  });
};

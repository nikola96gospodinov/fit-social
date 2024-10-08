import { useQueryClient } from "@tanstack/react-query";
import { SESSION_QUERY_KEY } from "../services/auth/auth-keys";
import { Session } from "@supabase/supabase-js";

// The session is cached on app load, so it will always be available
export const useGetSessionFromQueryClient = () => {
  const queryClient = useQueryClient();

  return queryClient.getQueryData([SESSION_QUERY_KEY]) as Session;
};

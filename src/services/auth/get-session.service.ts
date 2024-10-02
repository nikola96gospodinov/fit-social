import { supabase } from "@/src/lib/supabase";
import { useQuery } from "@tanstack/react-query";

const SESSION_KEY = "session";

const getSession = async () => {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    throw new Error(error.message);
  }

  return data.session;
};

export const useGetSession = () => {
  return useQuery({
    queryKey: [SESSION_KEY],
    queryFn: getSession,
  });
};

import { useGetSessionFromQueryClient } from "@/src/hooks/use-get-session-from-query-client";
import { supabase } from "@/src/lib/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PROFILE_QUERY_KEY } from "./profile-keys";

const updateProfile = async (data: any) => {
  const { data: profile, error } = await supabase.from("profiles").update(data);

  if (error) {
    throw new Error(error.message);
  }

  return profile;
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const session = useGetSessionFromQueryClient();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [PROFILE_QUERY_KEY, session?.user.id],
      });
    },
  });
};

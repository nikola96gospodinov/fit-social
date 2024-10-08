import { useGetSessionFromQueryClient } from "@/src/hooks/use-get-session-from-query-client";
import { supabase } from "@/src/lib/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PROFILE_QUERY_KEY } from "./profile-keys";
import type { EditProfileForm } from "@/src/screens/profile/edit/edit-profile-form/edit-profile-form.schema";
import { router } from "expo-router";

const updateProfile = async (data: EditProfileForm) => {
  const { data: profile, error } = await supabase
    .from("profiles")
    .update(data)
    .eq("username", data.username);

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

      router.push("/profile");
    },
  });
};

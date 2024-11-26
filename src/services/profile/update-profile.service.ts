import { supabase } from "@/src/lib/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PROFILE_QUERY_KEY } from "./profile-keys";
import type { EditProfileForm } from "@/src/screens/profile/edit/edit-profile-form/edit-profile-form.schema";
import { router } from "expo-router";
import { isEmpty } from "lodash";
import { useGetSession } from "../auth/get-session.service";

type Props = {
  data: Partial<EditProfileForm>;
  id: string;
};

const updateProfile = async ({ data, id }: Props) => {
  if (isEmpty(data)) return;

  const { data: profile, error } = await supabase
    .from("profiles")
    .update(data)
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  return profile;
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { data: session } = useGetSession();

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

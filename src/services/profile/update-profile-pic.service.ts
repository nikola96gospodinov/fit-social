import { supabase } from "@/src/lib/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { decode } from "base64-arraybuffer";
import * as FileSystem from "expo-file-system";
import { useGetProfile } from "./get-profile.service";
import { GET_PROFILE_PIC_QUERY_KEY } from "./profile-keys";

type Props = {
  imageUri: string;
  handle: string;
};

const updateProfilePic = async ({ imageUri, handle }: Props) => {
  const base64 = await FileSystem.readAsStringAsync(imageUri, {
    encoding: FileSystem.EncodingType.Base64,
  });
  const filePath = `public/${handle}/avatar.png`;

  const { data, error } = await supabase.storage
    .from("avatars")
    .upload(filePath, decode(base64), {
      upsert: true,
      contentType: "image/png",
    });

  if (error) {
    throw new Error(error.message);
  }

  const { error: profileError } = await supabase
    .from("profiles")
    .update({ avatar_url: data?.path })
    .eq("handle", handle);

  if (profileError) {
    throw new Error(profileError.message);
  }
};

export const useUpdateProfilePic = () => {
  const queryClient = useQueryClient();

  const { data: profile } = useGetProfile();

  return useMutation({
    mutationFn: updateProfilePic,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GET_PROFILE_PIC_QUERY_KEY, profile?.avatar_url],
      });
    },
  });
};

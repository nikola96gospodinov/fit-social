import { supabase } from "@/src/lib/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { decode } from "base64-arraybuffer";
import { useGetProfile } from "./get-profile.service";
import { GET_PROFILE_PIC_QUERY_KEY } from "./profile-keys";
import { router } from "expo-router";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";

type Props = {
  imageUri: string;
  userID: string;
};

const updateProfilePic = async ({ imageUri, userID }: Props) => {
  const compressedImage = await manipulateAsync(
    imageUri,
    [{ resize: { width: 684, height: 684 } }],
    {
      format: SaveFormat.PNG,
      compress: 0,
      base64: true,
    },
  );

  const filePath = `${userID}/avatar.png`;

  const { data, error } = await supabase.storage
    .from("files")
    .upload(filePath, decode(compressedImage.base64 ?? ""), {
      upsert: true,
      contentType: "image/png",
    });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  const { error: profileError } = await supabase
    .from("profiles")
    .update({ avatar_url: data?.path })
    .eq("id", userID);

  if (profileError) {
    console.error(profileError);
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
        queryKey: [GET_PROFILE_PIC_QUERY_KEY, profile?.id],
      });

      router.back();
    },
  });
};

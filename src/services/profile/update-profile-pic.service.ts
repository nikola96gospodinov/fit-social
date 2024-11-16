import { supabase } from "@/src/lib/supabase";
import { useMutation } from "@tanstack/react-query";
import { decode } from "base64-arraybuffer";

type Props = {
  imageBase64: string;
  handle: string;
};

const updateProfilePic = async ({ imageBase64, handle }: Props) => {
  const { data, error } = await supabase.storage
    .from("avatars")
    .upload(`public/${handle}`, decode(imageBase64), {
      upsert: true,
    });

  if (error) {
    throw new Error(error.message);
  }

  const { error: profileError } = await supabase
    .from("profiles")
    .update({ avatar_url: data?.fullPath })
    .eq("handle", handle);

  if (profileError) {
    throw new Error(profileError.message);
  }
};

export const useUpdateProfilePic = () => {
  return useMutation({
    mutationFn: updateProfilePic,
  });
};

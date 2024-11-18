import { supabase } from "@/src/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { useGetProfile } from "./get-profile.service";
import { GET_PROFILE_PIC_QUERY_KEY } from "./profile-keys";

const getProfilePic = async (avatarUrl?: string | null) => {
  if (!avatarUrl) return null;

  const { data, error } = await supabase.storage
    .from("avatars")
    .download(avatarUrl);

  if (error) {
    throw new Error(error.message);
  }

  if (!data) return null;

  const fr = new FileReader();
  const imagePromise = new Promise<string | null>((resolve, reject) => {
    fr.onload = () => {
      resolve(fr.result as string | null);
    };
    fr.onerror = () => {
      reject(new Error("Failed to read file"));
    };
  });

  fr.readAsDataURL(data);
  return imagePromise;
};

export const useGetProfilePic = () => {
  const { data: profile } = useGetProfile();

  return useQuery({
    queryKey: [GET_PROFILE_PIC_QUERY_KEY, profile?.avatar_url],
    queryFn: () => getProfilePic(profile?.avatar_url),
    enabled: !!profile?.avatar_url,
  });
};

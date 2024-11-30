import { supabase } from "@/src/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { GET_PROFILE_PIC_QUERY_KEY } from "./profile-keys";

const getProfilePic = async (userid?: string | null) => {
  const { data: session } = await supabase.auth.getSession();

  const { data, error } = await supabase.storage
    .from("files")
    .download(`${userid ?? session?.session?.user.id}/avatar.png`);

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
  return await imagePromise;
};

export const useGetProfilePic = (userId?: string | null) => {
  return useQuery({
    queryKey: [GET_PROFILE_PIC_QUERY_KEY, userId],
    queryFn: () => getProfilePic(userId),
  });
};

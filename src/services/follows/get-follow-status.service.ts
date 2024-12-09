import { supabase } from "@/src/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { ACCOUNT_FOLLOW_STATUS_QUERY_KEY } from "./keys";

type Props = {
  followedId: string;
  isReverse?: boolean;
};

const getFollowStatus = async ({ followedId, isReverse }: Props) => {
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError) {
    console.error("getFollowStatus", userError);
    throw new Error(userError.message);
  }

  const { data, error } = await supabase
    .from("follows")
    .select("status")
    .match({
      follower_id: isReverse ? followedId : userData.user?.id,
      followed_id: isReverse ? userData.user?.id : followedId,
    });

  if (error) {
    console.error("getFollowStatus", error);
    throw new Error(error.message);
  }

  return data?.[0]?.status ?? null;
};

export const useGetFollowStatus = ({ followedId, isReverse }: Props) => {
  return useQuery({
    queryKey: [ACCOUNT_FOLLOW_STATUS_QUERY_KEY, followedId, isReverse],
    queryFn: () => getFollowStatus({ followedId, isReverse }),
  });
};

import { supabase } from "@/src/lib/supabase";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getProfile } from "../profile/get-profile.service";
import { GET_FOLLOWING_QUERY_KEY } from "./keys";

export const getAllFollowing = async (id?: string | null) => {
  let followerId = id;

  if (!followerId) {
    const data = await getProfile();

    followerId = data?.id;
  }

  const { data, error } = await supabase
    .from("follows")
    .select("*, profiles!follows_followed_id_fkey(*)")
    .match({ follower_id: followerId!, status: "accepted" });

  if (error) {
    console.error(error);
    throw new Error("Failed to get following");
  }

  return data;
};

type Props = {
  id?: string | null;
  pageParam?: number;
  pageSize?: number;
};

const getFollowing = async ({ id, pageParam = 0, pageSize = 25 }: Props) => {
  let followerId = id;

  if (!followerId) {
    const data = await getProfile();
    followerId = data?.id;
  }

  const { data, error } = await supabase
    .from("follows")
    .select("*, profiles!follows_followed_id_fkey(*)")
    .match({ follower_id: followerId!, status: "accepted" })
    .range(pageParam * pageSize, (pageParam + 1) * pageSize - 1);

  if (error) {
    console.error(error);
    throw new Error("Failed to get following");
  }

  return {
    items: data,
    nextPage: data.length === pageSize ? pageParam + 1 : undefined,
  };
};

export const useGetInfiniteFollowing = (id?: string | null) => {
  return useInfiniteQuery({
    queryKey: [GET_FOLLOWING_QUERY_KEY, id],
    queryFn: ({ pageParam }) => getFollowing({ id, pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
  });
};

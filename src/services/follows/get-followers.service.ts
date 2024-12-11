import { supabase } from "@/src/lib/supabase";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getProfile } from "../profile/get-profile.service";

const GET_FOLLOWERS_QUERY_KEY = "get-followers";

type Props = {
  id?: string | null;
  pageParam?: number;
  pageSize?: number;
};

const getFollowers = async ({ id, pageParam = 0, pageSize = 25 }: Props) => {
  let followedId = id;

  if (!followedId) {
    const data = await getProfile();
    followedId = data?.id;
  }

  const { data, error } = await supabase
    .from("follows")
    .select("*, profiles!follows_follower_id_fkey(*)")
    .match({ followed_id: followedId!, status: "accepted" })
    .order("created_at", { ascending: false })
    .range(pageParam * pageSize, (pageParam + 1) * pageSize - 1);

  if (error) {
    console.error(error);
    throw new Error("Failed to get followers");
  }

  return {
    items: data,
    nextPage: data.length === pageSize ? pageParam + 1 : undefined,
  };
};

export const useGetInfiniteFollowers = (id?: string | null) => {
  return useInfiniteQuery({
    queryKey: [GET_FOLLOWERS_QUERY_KEY, id],
    queryFn: ({ pageParam }) => getFollowers({ id, pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
  });
};

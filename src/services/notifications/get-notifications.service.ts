import { supabase } from "@/src/lib/supabase";
import { useInfiniteQuery } from "@tanstack/react-query";
import { NOTIFICATIONS_QUERY_KEY } from "./keys";

type Props = {
  isRead: boolean;
  pageParam?: number;
  limit?: number;
};

const getNotifications = async ({
  isRead,
  pageParam = 0,
  limit = 25,
}: Props) => {
  const { data: user, error: userError } = await supabase.auth.getUser();

  if (userError) {
    console.error("getNotifications", userError);
    throw new Error(userError.message);
  }

  const from = pageParam * limit;
  const to = from + limit - 1;

  const { data, error, count } = await supabase
    .from("notifications")
    .select("*, profiles!notifications_sender_id_fkey(*)", {
      count: "exact",
    })
    .match({ receiver_id: user.user?.id, is_read: isRead })
    .order("created_at")
    .range(from, to);

  if (error) {
    console.error("getNotifications", error);
    throw new Error(error.message);
  }

  return {
    data,
    count,
    nextPage: to < (count ?? 0) - 1 ? pageParam + 1 : undefined,
  };
};

export const useGetInfiniteNotifications = ({
  isRead,
}: Omit<Props, "pageParam">) => {
  return useInfiniteQuery({
    queryKey: [NOTIFICATIONS_QUERY_KEY, isRead],
    queryFn: ({ pageParam }) => getNotifications({ isRead, pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
  });
};

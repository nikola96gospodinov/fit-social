import { supabase } from "@/src/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { NOTIFICATIONS_QUERY_KEY } from "./keys";

type Props = {
  isRead: boolean;
};

const getNotifications = async ({ isRead }: Props) => {
  const { data: user, error: userError } = await supabase.auth.getUser();

  if (userError) {
    console.error("getNotifications", userError);
    throw new Error(userError.message);
  }

  const { data, error, count } = await supabase
    .from("notifications")
    .select("*, profiles!notifications_sender_id_fkey(*)", {
      count: "exact",
    })
    .match({ receiver_id: user.user?.id, is_read: isRead })
    .order("created_at");

  if (error) {
    console.error("getNotifications", error);
    throw new Error(error.message);
  }

  return { data, count };
};

export const useGetNotifications = ({ isRead }: Props) => {
  return useQuery({
    queryKey: [NOTIFICATIONS_QUERY_KEY, isRead],
    queryFn: () => getNotifications({ isRead }),
  });
};

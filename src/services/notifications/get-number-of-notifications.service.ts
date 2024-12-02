import { supabase } from "@/src/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { NUMBER_OF_NOTIFICATIONS_QUERY_KEY } from "./keys";

type Props = {
  isRead: boolean;
};

const getNumberOfNotifications = async ({ isRead }: Props) => {
  const { data: user, error: userError } = await supabase.auth.getUser();

  if (userError) {
    console.error("getNumberOfNotifications", userError);
    throw new Error(userError.message);
  }

  const { error, count } = await supabase
    .from("notifications")
    .select("*", {
      count: "exact",
    })
    .match({ receiver_id: user.user?.id, is_read: isRead });

  if (error) {
    console.error("getNumberOfNotifications", error);
    throw new Error(error.message);
  }

  return count;
};

export const useGetNumberOfNotifications = ({ isRead }: Props) => {
  return useQuery({
    queryKey: [NUMBER_OF_NOTIFICATIONS_QUERY_KEY, isRead],
    queryFn: () => getNumberOfNotifications({ isRead }),
  });
};

import { supabase } from "@/src/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { GET_FOLLOW_REQUESTS } from "./keys";

const getFollowRequests = async (isRead?: boolean) => {
  const { data: user, error: userError } = await supabase.auth.getUser();

  if (userError) {
    console.error("getFollowRequests", userError);
    throw new Error("Failed to get follow requests");
  }

  const { data, count, error } = await supabase
    .from("notifications")
    .select("*, profiles!notifications_sender_id_fkey(*)", {
      count: "exact",
    })
    .match({
      notification_type: "follow_request",
      receiver_id: user.user?.id,
      ...(isRead === false && { is_read: false }),
    })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getFollowRequests", error);
    throw new Error("Failed to get follow requests");
  }

  return { data, count };
};

export const useGetFollowRequests = (isRead?: boolean) => {
  return useQuery({
    queryKey: [GET_FOLLOW_REQUESTS, isRead],
    queryFn: () => getFollowRequests(isRead),
  });
};

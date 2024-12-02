import { supabase } from "@/src/lib/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NUMBER_OF_NOTIFICATIONS_QUERY_KEY } from "./keys";

const readNotifications = async (notificationIds: string[]) => {
  const { error } = await supabase
    .from("notifications")
    .update({ is_read: true })
    .in("id", notificationIds);

  if (error) {
    console.error("readNotifications", error);
    throw new Error("Failed to read notifications");
  }
};

export const useReadNotifications = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: readNotifications,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [NUMBER_OF_NOTIFICATIONS_QUERY_KEY],
      });
    },
  });
};

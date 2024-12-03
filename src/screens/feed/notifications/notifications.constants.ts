import { Database } from "@/src/types/database.types";

type NotificationType = Database["public"]["Enums"]["notification_type"];

export const NOTIFICATION_TYPES: Record<NotificationType, string> = {
  started_following: "Started following you",
  follow_request: "Requested to follow you",
  follow_request_accepted: "Accepted your follow request",
  workout_like: "Liked your workout",
};

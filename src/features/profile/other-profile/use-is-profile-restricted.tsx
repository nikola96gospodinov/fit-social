import { useGetFollowStatus } from "@/src/services/follows/get-follow-status.service";
import { useGetProfile } from "@/src/services/profile/get-profile.service";

export const useIsProfileRestricted = (userId: string) => {
  const { data: profile } = useGetProfile(userId);

  const { data: followStatus } = useGetFollowStatus({
    followedId: userId,
  });

  return !profile?.is_public || followStatus !== "accepted";
};

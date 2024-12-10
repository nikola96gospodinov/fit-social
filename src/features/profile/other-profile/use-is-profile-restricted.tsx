import { useGetSession } from "@/src/services/auth/get-session.service";
import { useGetFollowStatus } from "@/src/services/follows/get-follow-status.service";
import { useGetProfile } from "@/src/services/profile/get-profile.service";

export const useIsProfileRestricted = (userId?: string) => {
  const { data: profile } = useGetProfile(userId);

  const { data: session } = useGetSession();

  const isOwnProfile = session?.user.id === profile?.id;

  const { data: followStatus } = useGetFollowStatus({
    followedId: userId ?? session?.user.id ?? "",
  });

  if (isOwnProfile) return false;
  return !profile?.is_public || followStatus !== "accepted";
};

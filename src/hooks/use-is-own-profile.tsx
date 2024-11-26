import { useGetSession } from "../services/auth/get-session.service";
import { useGetProfile } from "../services/profile/get-profile.service";

export const useIsOwnProfile = () => {
  const { data: session } = useGetSession();

  const { data: profile } = useGetProfile();

  return profile?.id === session?.user.id;
};

import { useLocalSearchParams } from "expo-router";
import { useGetOwnProfile } from "@/src/services/profile/get-own-profile.service";

export const useIsOwnProfile = () => {
  const { handle } = useLocalSearchParams();

  const { data: profile } = useGetOwnProfile();

  if (!handle) return true;

  return profile?.handle === handle;
};

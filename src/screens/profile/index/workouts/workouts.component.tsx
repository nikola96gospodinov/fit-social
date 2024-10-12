import { useGetProfile } from "@/src/services/profile/get-profile.service";
import { View } from "react-native";

export const Workouts = () => {
  const { data: profile } = useGetProfile();

  if (!profile) return null;

  return <View></View>;
};

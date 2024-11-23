import { useGetProfile } from "@/src/services/profile/get-profile.service";
import { useNavigation } from "expo-router";
import { View } from "react-native";
import { useEffect } from "react";

export const FollowsContent = () => {
  const navigation = useNavigation();

  const { data: profile } = useGetProfile();

  useEffect(() => {
    if (profile?.handle) {
      navigation.setOptions({
        title: `@${profile.handle}`,
      });
    }
  }, [profile?.handle, navigation]);

  return <View></View>;
};

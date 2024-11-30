import { useGetProfile } from "@/src/services/profile/get-profile.service";
import { useNavigation } from "expo-router";
import { useWindowDimensions } from "react-native";
import { useEffect, useState } from "react";
import { TabView, SceneMap } from "react-native-tab-view";
import { Followers } from "./followers/followers.component";
import { Following } from "./following/foloowing.component";
import { StyledTabBar as FollowingTabBar } from "@/src/components/tab-view/styled-tab-bar.component";

const defaultRoutes = [
  { key: "followers", title: "Followers" },
  { key: "following", title: "Following" },
];

const renderScene = SceneMap({
  followers: Followers,
  following: Following,
});

export const FollowsContent = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState(defaultRoutes);

  const navigation = useNavigation();
  const { data: profile } = useGetProfile();

  useEffect(() => {
    if (profile?.handle) {
      navigation.setOptions({
        title: `@${profile.handle}`,
      });
    }
  }, [profile?.handle, navigation]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={FollowingTabBar}
    />
  );
};

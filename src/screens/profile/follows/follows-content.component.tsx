import { useGetProfile } from "@/src/services/profile/get-profile.service";
import { useNavigation } from "expo-router";
import { useColorScheme, useWindowDimensions } from "react-native";
import { useEffect, useState } from "react";
import { TabView, SceneMap, TabBarProps, TabBar } from "react-native-tab-view";
import { colors } from "@/src/constants/colors.constants";
import { Followers } from "./followers/followers.component";
import { Following } from "./following/foloowing.component";

const defaultRoutes = [
  { key: "followers", title: "Followers" },
  { key: "following", title: "Following" },
];

const FollowingTabBar = (
  props: TabBarProps<(typeof defaultRoutes)[number]>,
) => {
  const theme = useColorScheme() ?? "light";

  return (
    <TabBar
      {...props}
      style={{ backgroundColor: colors[theme].cardBackground }}
      activeColor={colors[theme].text}
      inactiveColor={colors[theme].supportingText}
      indicatorStyle={{ backgroundColor: colors[theme].tintBackground }}
    />
  );
};

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

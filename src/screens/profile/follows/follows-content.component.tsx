import { useGetProfile } from "@/src/services/profile/get-profile.service";
import { useNavigation } from "expo-router";
import { useColorScheme, useWindowDimensions, View } from "react-native";
import { useEffect, useState } from "react";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { TabView, SceneMap, TabBarProps, TabBar } from "react-native-tab-view";
import { colors } from "@/src/constants/colors.constants";

const defaultRoutes = [
  { key: "followers", title: "Followers" },
  { key: "following", title: "Following" },
];

const FollowersTabs = () => {
  return (
    <View>
      <ThemedText>Followers</ThemedText>
    </View>
  );
};

const FollowingTabs = () => {
  return (
    <View>
      <ThemedText>Following</ThemedText>
    </View>
  );
};

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
  followers: FollowersTabs,
  following: FollowingTabs,
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

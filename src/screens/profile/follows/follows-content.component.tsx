import { useGetProfile } from "@/src/services/profile/get-profile.service";
import { useNavigation } from "expo-router";
import { useWindowDimensions, View } from "react-native";
import { useEffect, useState } from "react";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { TabView, SceneMap } from "react-native-tab-view";

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

const renderScene = SceneMap({
  followers: FollowersTabs,
  following: FollowingTabs,
});

export const FollowsContent = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "followers", title: "Followers" },
    { key: "following", title: "Following" },
  ]);

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
    />
  );
};

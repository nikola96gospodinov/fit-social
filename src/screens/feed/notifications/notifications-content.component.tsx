import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { useState } from "react";
import { useWindowDimensions } from "react-native";
import { SceneMap, TabView } from "react-native-tab-view";
import { StyledTabBar as NotificationsTabBar } from "@/src/components/tab-view/styled-tab-bar.component";

const defaultRoutes = [
  { key: "unread", title: "New" },
  { key: "read", title: "Read" },
];

const renderScene = SceneMap({
  unread: () => <ThemedText>New</ThemedText>,
  read: () => <ThemedText>Read</ThemedText>,
});

export const NotificationsContent = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState(defaultRoutes);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={NotificationsTabBar}
    />
  );
};

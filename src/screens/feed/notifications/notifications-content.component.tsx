import { useEffect, useState } from "react";
import { useWindowDimensions } from "react-native";
import { SceneMap, TabView } from "react-native-tab-view";
import { StyledTabBar as NotificationsTabBar } from "@/src/components/tab-view/styled-tab-bar.component";
import { ReadNotifications } from "./read-notifications/read-notifications.component";
import { UnreadNotifications } from "./unread-notifications/unread-notifications.component";
import { useNavigation } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";
import {
  GET_FOLLOW_REQUESTS,
  NOTIFICATIONS_QUERY_KEY,
  NUMBER_OF_NOTIFICATIONS_QUERY_KEY,
} from "@/src/services/notifications/keys";

const defaultRoutes = [
  { key: "unread", title: "New" },
  { key: "read", title: "Read" },
];

const renderScene = SceneMap({
  unread: UnreadNotifications,
  read: ReadNotifications,
});

export const NotificationsContent = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState(defaultRoutes);

  const navigation = useNavigation();
  const queryClient = useQueryClient();

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      queryClient.invalidateQueries({
        queryKey: [NOTIFICATIONS_QUERY_KEY],
      });

      queryClient.invalidateQueries({
        queryKey: [NUMBER_OF_NOTIFICATIONS_QUERY_KEY],
      });

      queryClient.invalidateQueries({
        queryKey: [GET_FOLLOW_REQUESTS],
      });
    });

    return unsubscribe;
  }, [navigation, queryClient]);

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

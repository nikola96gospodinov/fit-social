import { FlashList } from "@shopify/flash-list";
import { NotificationBox } from "../notification-box/notification-box.component";
import { useGetNotifications } from "@/src/services/notifications/get-notifications.service";
import { StyleSheet } from "react-native";
import { spacing } from "@/src/constants/spacing.constants";
import { useReadNotifications } from "@/src/services/notifications/read-notifications.service";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { NotificationsFooter } from "../notifications-footer/notifications-footer.component";
import { useNavigation } from "expo-router";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import {
  GET_FOLLOW_REQUESTS,
  NOTIFICATIONS_QUERY_KEY,
  NUMBER_OF_NOTIFICATIONS_QUERY_KEY,
} from "@/src/services/notifications/keys";

export const UnreadNotifications = () => {
  const {
    data: notificationsData,
    isLoading,
    isError,
    refetch,
  } = useGetNotifications({
    isRead: false,
  });

  const { mutate: readNotifications } = useReadNotifications();

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
    <FlashList
      data={notificationsData?.data}
      renderItem={({ item }) => <NotificationBox notification={item} />}
      estimatedItemSize={20}
      contentContainerStyle={styles.container}
      viewabilityConfig={{
        minimumViewTime: 250, // 0.25s
        itemVisiblePercentThreshold: 75,
        waitForInteraction: false,
      }}
      onViewableItemsChanged={({ viewableItems }) => {
        if (viewableItems.length > 0) {
          readNotifications(viewableItems.map((item) => item.item.id));
        }
      }}
      ItemSeparatorComponent={() => <VerticalSpacing size={4} />}
      ListFooterComponent={() => (
        <NotificationsFooter
          isLoading={isLoading}
          isError={isError}
          refetch={refetch}
          count={notificationsData?.count}
          emptyStateText="You're all caught up! 🤩"
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing[4],
  },
});

import { FlashList } from "@shopify/flash-list";
import { NotificationBox } from "../notification-box/notification-box.component";
import { useGetInfiniteNotifications } from "@/src/services/notifications/get-notifications.service";
import { StyleSheet } from "react-native";
import { spacing } from "@/src/constants/spacing.constants";
import { useReadNotifications } from "@/src/services/notifications/read-notifications.service";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { NotificationsFooter } from "../notifications-footer/notifications-footer.component";
import { useNavigation } from "expo-router";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import {
  GET_FOLLOW_REQUESTS,
  NOTIFICATIONS_QUERY_KEY,
  NUMBER_OF_NOTIFICATIONS_QUERY_KEY,
} from "@/src/services/notifications/keys";

export const UnreadNotifications = () => {
  const {
    data: notificationsData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoadingError,
    refetch,
    isFetchNextPageError,
    isLoading,
  } = useGetInfiniteNotifications({
    isRead: false,
  });

  const notifications = useMemo(() => {
    return notificationsData?.pages.flatMap((page) => page.data) || [];
  }, [notificationsData?.pages]);

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
      data={notifications}
      onEndReached={() => hasNextPage && fetchNextPage()}
      onEndReachedThreshold={0.5}
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
          isError={isLoadingError}
          refetch={refetch}
          count={notificationsData?.pages[0].count}
          emptyStateText="You're all caught up! 🤩"
          isFetchNextPageError={isFetchNextPageError}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
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

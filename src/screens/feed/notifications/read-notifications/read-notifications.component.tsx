import { FlashList } from "@shopify/flash-list";
import { NotificationBox } from "../notification-box/notification-box.component";
import { useGetInfiniteNotifications } from "@/src/services/notifications/get-notifications.service";
import { StyleSheet } from "react-native";
import { spacing } from "@/src/constants/spacing.constants";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { NotificationsFooter } from "../notifications-footer/notifications-footer.component";
import { useMemo } from "react";

export const ReadNotifications = () => {
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
    isRead: true,
  });

  const notifications = useMemo(() => {
    return notificationsData?.pages.flatMap((page) => page.data) || [];
  }, [notificationsData?.pages]);

  return (
    <FlashList
      data={notifications}
      onEndReached={() => hasNextPage && fetchNextPage()}
      renderItem={({ item }) => <NotificationBox notification={item} />}
      estimatedItemSize={20}
      contentContainerStyle={styles.container}
      ItemSeparatorComponent={() => <VerticalSpacing size={4} />}
      ListFooterComponent={() => (
        <NotificationsFooter
          isLoading={isLoading}
          isError={isLoadingError}
          refetch={refetch}
          count={notificationsData?.pages[0].count}
          emptyStateText="No notifications yet 🧐"
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

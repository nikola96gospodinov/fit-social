import { useGetFollowRequests } from "@/src/services/notifications/get-follow-requests.service";
import { FlashList } from "@shopify/flash-list";
import { NotificationBox } from "../../feed/notifications/notification-box/notification-box.component";
import { ThemedActivityIndicator } from "@/src/components/ui/themed-activity-indicator/themed-activity-indicator.component";
import { spacing } from "@/src/constants/spacing.constants";
import { StyleSheet } from "react-native";
import { useReadNotifications } from "@/src/services/notifications/read-notifications.service";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { NotificationsFooter } from "../../feed/notifications/notifications-footer/notifications-footer.component";

export const FollowRequestsContent = () => {
  const {
    data: followRequests,
    isLoading,
    isError,
    refetch,
  } = useGetFollowRequests();

  const { mutate: readNotifications } = useReadNotifications();

  if (isLoading || !followRequests) {
    return (
      <>
        <VerticalSpacing size={4} />

        <ThemedActivityIndicator />
      </>
    );
  }

  return (
    <FlashList
      data={followRequests?.data}
      renderItem={({ item }) => <NotificationBox notification={item} />}
      estimatedItemSize={followRequests?.count || 100}
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
          count={followRequests?.count}
          emptyStateText="No follow requests yet"
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

import { FlashList } from "@shopify/flash-list";
import { NotificationBox } from "../notification-box/notification-box.component";
import { useGetNotifications } from "@/src/services/notifications/get-notifications.service";
import { StyleSheet } from "react-native";
import { spacing } from "@/src/constants/spacing.constants";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { NotificationsFooter } from "../notifications-footer/notifications-footer.component";

export const ReadNotifications = () => {
  const {
    data: notificationsData,
    isLoading,
    isError,
    refetch,
  } = useGetNotifications({
    isRead: true,
  });

  return (
    <FlashList
      data={notificationsData?.data}
      renderItem={({ item }) => <NotificationBox notification={item} />}
      estimatedItemSize={20}
      contentContainerStyle={styles.container}
      ItemSeparatorComponent={() => <VerticalSpacing size={4} />}
      ListFooterComponent={() => (
        <NotificationsFooter
          isLoading={isLoading}
          isError={isError}
          refetch={refetch}
          count={notificationsData?.count}
          emptyStateText="No notifications yet 🧐"
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

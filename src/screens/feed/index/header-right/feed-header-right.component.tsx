import { Flex } from "@/src/components/ui/layout/flex/flex.component";
import { colors, red, slate } from "@/src/constants/colors.constants";
import { useGetNotifications } from "@/src/services/notifications/get-notifications.service";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, useColorScheme, StyleSheet, Text } from "react-native";

export const FeedHeaderRight = () => {
  const theme = useColorScheme() ?? "light";

  const { data } = useGetNotifications({ isRead: false });

  const showNotificationBubble = data?.count && data.count > 0;

  const numberOfNotifications = (data?.count ?? 0) ? "9+" : data?.count;

  return (
    <Pressable
      style={styles.container}
      onPress={() => router.push("/notifications")}>
      <Ionicons name="heart-outline" size={24} color={colors[theme].icon} />
      {!!showNotificationBubble && (
        <Flex align="center" justify="center" style={styles.notificationBubble}>
          <Text style={styles.notificationBubbleText}>
            {numberOfNotifications}
          </Text>
        </Flex>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },

  notificationBubble: {
    position: "absolute",
    top: -6,
    right: -6,
    borderRadius: 20,
    width: 16,
    height: 16,
    backgroundColor: red[600],
  },

  notificationBubbleText: {
    fontSize: 10,
    textAlign: "center",
    color: slate[50],
  },
});

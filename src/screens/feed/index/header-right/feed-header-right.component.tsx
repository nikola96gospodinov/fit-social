import { Flex } from "@/src/components/ui/layout/flex/flex.component";
import { colors, red, slate } from "@/src/constants/colors.constants";
import { useGetNumberOfNotifications } from "@/src/services/notifications/get-number-of-notifications.service";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, useColorScheme, StyleSheet, Text } from "react-native";

export const FeedHeaderRight = () => {
  const theme = useColorScheme() ?? "light";

  const { data: count } = useGetNumberOfNotifications({
    isRead: false,
  });

  const showNotificationBubble = count && count > 0;

  const numberOfNotifications = (count ?? 0) > 9 ? "9+" : count;

  return (
    <Pressable
      style={styles.container}
      onPress={() => router.push("/notifications")}>
      <Ionicons
        name="notifications-outline"
        size={20}
        color={colors[theme].icon}
      />

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

import { Flex } from "@/src/components/ui/layout/flex/flex.component";
import { colors, red, slate } from "@/src/constants/colors.constants";
import { useGetFollowRequests } from "@/src/services/notifications/get-follow-requests.service";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, useColorScheme } from "react-native";

export const FollowRequestsIcon = () => {
  const theme = useColorScheme() ?? "light";

  const { data: followRequests, isLoading } = useGetFollowRequests(false);

  const showNotificationBubble =
    followRequests?.count && followRequests.count > 0 && !isLoading;
  const numberOfNotifications = followRequests?.count;

  return (
    <Pressable
      style={styles.container}
      onPress={() => router.push("/profile/follow-requests")}>
      <AntDesign name="adduser" size={24} color={colors[theme].icon} />

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
    width: 14,
    height: 14,
    backgroundColor: red[600],
  },

  notificationBubbleText: {
    fontSize: 9,
    textAlign: "center",
    color: slate[50],
  },
});

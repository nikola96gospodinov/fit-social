import { Avatar } from "@/src/components/avatar/avatar.component";
import { Flex } from "@/src/components/ui/layout/flex/flex.component";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { Tables } from "@/src/types/database.types";
import { Pressable, useColorScheme, View } from "react-native";
import { NOTIFICATION_TYPES } from "../notifications.constants";
import { FollowButton } from "@/src/features/follows/follow-button/follow-button.component";
import Octicons from "@expo/vector-icons/Octicons";
import { colors } from "@/src/constants/colors.constants";
import { useGetProfileHref } from "@/src/hooks/use-get-profile-href";
import { router } from "expo-router";
import { AcceptButton } from "@/src/features/follows/accept-button/accept-button.component";
import { useGetFollowStatus } from "@/src/services/follows/get-follow-status.service";

type Props = {
  notification: Tables<"notifications"> & {
    profiles: Tables<"profiles"> | null;
  };
};

export const NotificationBox = ({ notification }: Props) => {
  const theme = useColorScheme() ?? "light";

  const profileHref = useGetProfileHref(notification.profiles?.id);

  return (
    <Flex direction="row" justify="space-between" align="flex-end" gap={2}>
      <Flex direction="row" align="center" gap={3}>
        {!notification.is_read && (
          <Octicons name="dot-fill" size={20} color={colors[theme].tintText} />
        )}

        <Flex direction="row" align="center" gap={2}>
          <Pressable onPress={() => router.push(profileHref)}>
            <Avatar size={36} userId={notification.profiles?.id} />
          </Pressable>

          <View>
            <Pressable onPress={() => router.push(profileHref)}>
              <ThemedText type="extraSmall" color="supporting">
                @{notification.profiles?.handle}
              </ThemedText>
            </Pressable>

            <ThemedText type="extraSmall">
              {NOTIFICATION_TYPES[notification.notification_type]}
            </ThemedText>
          </View>
        </Flex>
      </Flex>

      <View>
        <Action notification={notification} />
      </View>
    </Flex>
  );
};

const Action = ({ notification }: { notification: Props["notification"] }) => {
  const { data: followStatus } = useGetFollowStatus({
    followedId: notification.profiles!.id,
    isReverse: true,
  });

  const showAcceptButton =
    notification.notification_type === "follow_request" &&
    followStatus === "pending";

  if (showAcceptButton)
    return <AcceptButton followerId={notification.profiles!.id} />;

  return <FollowButton profileToFollow={notification.profiles!} />;
};

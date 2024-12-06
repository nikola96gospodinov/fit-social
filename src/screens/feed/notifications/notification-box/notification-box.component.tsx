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

type Props = {
  notification: Tables<"notifications"> & {
    profiles: Tables<"profiles"> | null;
  };
  isRead: boolean;
};

export const NotificationBox = ({ notification, isRead }: Props) => {
  const theme = useColorScheme() ?? "light";

  const profileHref = useGetProfileHref(notification.profiles?.id);

  return (
    <Flex direction="row" justify="space-between" align="flex-end" gap={2}>
      <Flex direction="row" align="center" gap={3}>
        {!isRead && (
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
        <FollowButton profileToFollow={notification.profiles!} />
      </View>
    </Flex>
  );
};

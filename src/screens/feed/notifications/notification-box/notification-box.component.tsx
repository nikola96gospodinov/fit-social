import { Avatar } from "@/src/components/avatar/avatar.component";
import { Flex } from "@/src/components/ui/layout/flex/flex.component";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { Tables } from "@/src/types/database.types";
import { useColorScheme, View } from "react-native";
import { NOTIFICATION_TYPES } from "../notifications.constants";
import { FollowButton } from "@/src/features/follows/follow-button/follow-button.component";
import Octicons from "@expo/vector-icons/Octicons";
import { colors } from "@/src/constants/colors.constants";

type Props = {
  notification: Tables<"notifications"> & {
    profiles: Tables<"profiles"> | null;
  };
  isRead: boolean;
};

export const NotificationBox = ({ notification, isRead }: Props) => {
  const theme = useColorScheme() ?? "light";

  return (
    <Flex direction="row" justify="space-between" align="flex-end" gap={2}>
      <Flex direction="row" align="center" gap={3}>
        {!isRead && (
          <Octicons name="dot-fill" size={20} color={colors[theme].tintText} />
        )}

        <Flex direction="row" align="center" gap={2}>
          <Avatar size={36} userId={notification.profiles?.id} />

          <View>
            <ThemedText type="extraSmall" color="supporting">
              @{notification.profiles?.handle}
            </ThemedText>

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

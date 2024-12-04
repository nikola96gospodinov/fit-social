import { Avatar } from "@/src/components/avatar/avatar.component";
import { Flex } from "@/src/components/ui/layout/flex/flex.component";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { colors } from "@/src/constants/colors.constants";
import { Tables } from "@/src/types/database.types";
import { getDistance } from "@/src/utils/dates.utils";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Pressable, useColorScheme, View } from "react-native";

type Props = {
  comment: Tables<"comments"> & { profiles: Tables<"profiles"> | null };
};

export const Comment = ({ comment }: Props) => {
  const theme = useColorScheme() ?? "light";

  const distance = getDistance(comment.created_at);

  return (
    <Flex justify="space-between" direction="row" gap={3}>
      <Flex gap={3} direction="row" style={{ flex: 1 }}>
        <Avatar size={24} userId={comment.profiles?.id} />

        <View style={{ flex: 1 }}>
          <Flex direction="row" gap={2}>
            <ThemedText type="extraSmall">
              @{comment.profiles?.handle}
            </ThemedText>
            <ThemedText type="extraSmall" color="supporting">
              {distance}
            </ThemedText>
          </Flex>

          <VerticalSpacing size={0.5} />

          <ThemedText type="small">{comment.content}</ThemedText>
        </View>
      </Flex>

      <Pressable style={{ flexShrink: 1 }}>
        <FontAwesome name="heart-o" size={16} color={colors[theme].icon} />
      </Pressable>
    </Flex>
  );
};

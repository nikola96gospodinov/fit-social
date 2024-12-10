import { Tables } from "@/src/types/database.types";
import { View, StyleSheet, useColorScheme, Dimensions } from "react-native";
import { spacing } from "@/src/constants/spacing.constants";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { colors } from "@/src/constants/colors.constants";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { Avatar } from "@/src/components/avatar/avatar.component";
import { Flex } from "@/src/components/ui/layout/flex/flex.component";
import { FollowButton } from "@/src/features/follows/follow-button/follow-button.component";

type Props = {
  profile: Tables<"profiles">;
  isLast: boolean;
  isFirst: boolean;
};

export const SuggestionBox = ({ profile, isLast, isFirst }: Props) => {
  const theme = useColorScheme() ?? "light";

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors[theme].sectionBackground },
        isFirst && { marginLeft: spacing[4] },
        isLast && { marginRight: spacing[4] },
      ]}>
      <Flex align="center" justify="center">
        <Avatar size={60} userId={profile.id} />
      </Flex>

      <VerticalSpacing size={2} />

      <ThemedText type="small" style={styles.handle}>
        @{profile.handle}
      </ThemedText>

      <VerticalSpacing size={3} />

      <FollowButton profileToFollow={profile} isFullWidth />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing[4],
    width: Dimensions.get("window").width / 2,
    borderRadius: 12,
  },

  handle: {
    textAlign: "center",
  },
});

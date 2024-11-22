import { Tables } from "@/src/types/database.types";
import { View, StyleSheet, useColorScheme, Dimensions } from "react-native";
import { spacing } from "@/src/constants/spacing.constants";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { colors } from "@/src/constants/colors.constants";
import { Image } from "expo-image";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ThemedButton } from "@/src/components/ui/themed-button/themed-button.component";
import { useGetProfilePic } from "@/src/services/profile/get-profile-pic.service";
import { useFollowAccount } from "@/src/services/follows/follow-account.service";

type Props = {
  profile: Tables<"profiles">;
  isLast: boolean;
  isFirst: boolean;
};

export const SuggestionBox = ({ profile, isLast, isFirst }: Props) => {
  const theme = useColorScheme() ?? "light";

  const { data: avatarUrl } = useGetProfilePic(
    profile.handle,
    profile.avatar_url,
  );

  const { mutate: followAccount, isPending: isFollowing } = useFollowAccount();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors[theme].sectionBackground },
        isFirst && { marginLeft: spacing[4] },
        isLast && { marginRight: spacing[4] },
      ]}>
      <Image source={avatarUrl ?? ""} style={styles.avatar} />

      <VerticalSpacing size={2} />

      <ThemedText type="small" style={styles.handle}>
        @{profile.handle}
      </ThemedText>

      <VerticalSpacing size={3} />

      <ThemedButton
        text="Follow"
        size="sm"
        isFullWidth
        onPress={() => followAccount(profile)}
        isLoading={isFollowing}
        disabled={isFollowing}
      />
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

  avatar: {
    width: 75,
    height: 75,
    borderRadius: 37.5,
    alignSelf: "center",
  },
});

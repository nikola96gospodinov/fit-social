import { Tables } from "@/src/types/database.types";
import { View, StyleSheet, useColorScheme, Dimensions } from "react-native";
import { spacing } from "@/src/constants/spacing.constants";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { colors } from "@/src/constants/colors.constants";
import { Image } from "expo-image";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ThemedButton } from "@/src/components/ui/themed-button/themed-button.component";
import { useGetProfilePic } from "@/src/services/profile/get-profile-pic.service";

type Props = {
  profile: Tables<"profiles">;
};

export const SuggestionBox = ({ profile }: Props) => {
  const theme = useColorScheme() ?? "light";

  const { data: avatarUrl } = useGetProfilePic(
    profile.handle ?? undefined,
    profile.avatar_url ?? undefined,
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors[theme].sectionBackground },
      ]}>
      <Image source={avatarUrl ?? ""} style={styles.avatar} />

      <VerticalSpacing size={2} />

      <ThemedText type="small" style={styles.handle}>
        @{profile.handle}
      </ThemedText>

      <VerticalSpacing size={3} />

      <ThemedButton text="Follow" size="sm" isFullWidth />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing[4],
    width: Dimensions.get("window").width / 2.25,
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

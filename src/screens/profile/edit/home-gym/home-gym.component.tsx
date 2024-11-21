import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { colors } from "@/src/constants/colors.constants";
import { spacing } from "@/src/constants/spacing.constants";
import { useGetProfile } from "@/src/services/profile/get-profile.service";
import { useColorScheme, StyleSheet, Pressable } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Flex } from "@/src/components/ui/layout/flex/flex.component";
import { router } from "expo-router";

export const HomeGym = () => {
  const theme = useColorScheme() ?? "light";

  const { data: profile } = useGetProfile();

  if (!profile) return null;

  const text = profile.home_gym_name ?? "You haven't set your home gym yet";

  return (
    <Flex
      direction="row"
      justify="space-between"
      align="center"
      style={[
        styles.homeGymContainer,
        {
          backgroundColor: colors[theme].tintActiveBackground,
          borderColor: colors[theme].tintBackground,
        },
      ]}>
      <Flex direction="row" align="center" gap={2}>
        <FontAwesome6
          name="location-dot"
          size={14}
          color={colors[theme].icon}
        />

        <ThemedText type="small">{text}</ThemedText>
      </Flex>

      <Pressable onPress={() => router.push("/profile/set-home-gym")}>
        <FontAwesome6 name="pencil" size={14} color={colors[theme].textIcon} />
      </Pressable>
    </Flex>
  );
};

const styles = StyleSheet.create({
  homeGymContainer: {
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
    borderRadius: spacing[4],
    borderLeftWidth: 2,
  },
});

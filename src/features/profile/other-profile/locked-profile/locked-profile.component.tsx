import { Flex } from "@/src/components/ui/layout/flex/flex.component";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { spacing } from "@/src/constants/spacing.constants";
import { StyleSheet, useColorScheme, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { colors } from "@/src/constants/colors.constants";

export const LockedProfile = () => {
  const theme = useColorScheme() ?? "light";

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      style={styles.container}>
      <View
        style={[
          styles.iconContainer,
          {
            borderColor: colors[theme].icon,
          },
        ]}>
        <Ionicons
          name="lock-closed-outline"
          size={24}
          color={colors[theme].textIcon}
        />
      </View>

      <VerticalSpacing size={3} />

      <ThemedText style={{ textAlign: "center" }}>
        This profile is private. Follow to view workouts.
      </ThemedText>
    </Flex>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing[8],
  },

  iconContainer: {
    borderRadius: 100,
    padding: spacing[3],
    borderWidth: 2,
  },
});

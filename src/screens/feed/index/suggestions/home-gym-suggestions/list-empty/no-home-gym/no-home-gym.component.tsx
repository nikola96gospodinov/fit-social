import { Flex } from "@/src/components/ui/layout/flex/flex.component";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ThemedButton } from "@/src/components/ui/themed-button/themed-button.component";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { router } from "expo-router";
import { StyleSheet } from "react-native";
import { spacing } from "@/src/constants/spacing.constants";

export const NoHomeGym = () => {
  return (
    <Flex direction="column" align="center" style={styles.container}>
      <ThemedText>Set a home gym to see suggestions</ThemedText>

      <VerticalSpacing size={2} />

      <ThemedButton
        size="sm"
        text="Set home gym"
        onPress={() => router.push("/profile/set-home-gym")}
      />
    </Flex>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing[4],
  },
});

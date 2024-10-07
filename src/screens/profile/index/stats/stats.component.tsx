import { Flex } from "@/src/components/ui/layout/flex/flex.component";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { spacing } from "@/src/constants/spacing.constants";
import { StyleSheet } from "react-native";
export const Stats = () => {
  return (
    <Flex direction="row" gap={2} style={styles.container}>
      <Flex direction="row" gap={1}>
        <ThemedText type="extraSmall" style={styles.countText}>
          9999
        </ThemedText>
        <ThemedText type="extraSmall">Followers</ThemedText>
      </Flex>

      <Flex direction="row" gap={1}>
        <ThemedText type="extraSmall" style={styles.countText}>
          9999
        </ThemedText>
        <ThemedText type="extraSmall">Following</ThemedText>
      </Flex>
    </Flex>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing[4],
  },

  countText: {
    fontWeight: "bold",
  },
});

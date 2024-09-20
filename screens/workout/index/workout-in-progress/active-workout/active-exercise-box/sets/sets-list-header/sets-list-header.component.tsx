import { Flex } from "@/components/ui/layout/flex/flex.component";
import { VerticalSpacing } from "@/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ThemedText } from "@/components/ui/themed-text/themed-text.component";
import { colors } from "@/constants/colors.constants";
import { spacing } from "@/constants/spacing.constants";
import { StyleSheet, useColorScheme } from "react-native";

export const SetsListHeader = () => {
  const theme = useColorScheme() ?? "light";

  return (
    <>
      <Flex
        direction="row"
        align="center"
        style={[
          styles.container,
          {
            borderBottomColor: colors[theme].border,
          },
        ]}>
        <Flex style={{ width: 32 }}>
          <ThemedText type="small" color="supporting">
            #
          </ThemedText>
        </Flex>

        <Flex direction="row" align="center" gap={6}>
          <Flex align="center" style={{ width: 60 }}>
            <ThemedText type="small" color="supporting">
              Weight
            </ThemedText>
          </Flex>

          <Flex align="center" style={{ width: 60 }}>
            <ThemedText type="small" color="supporting">
              Reps
            </ThemedText>
          </Flex>
        </Flex>
      </Flex>

      <VerticalSpacing size={2} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing[3],
    paddingBottom: spacing[2],
    borderBottomWidth: 1,
  },
});

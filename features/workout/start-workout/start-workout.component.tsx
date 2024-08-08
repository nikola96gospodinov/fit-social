import { Divider } from "@/components/ui/divider/divider.component";
import { Box } from "@/components/ui/layout/box/box.component";
import { Flex } from "@/components/ui/layout/flex/flex.component";
import { VerticalSpacing } from "@/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ThemedButton } from "@/components/ui/themed-button/themed-button.component";
import { ThemedText } from "@/components/ui/themed-text.component";
import { useStore } from "@/store";
import { SafeAreaView, StyleSheet } from "react-native";

export const StartWorkout = () => {
  const { startWorkout } = useStore();

  return (
    <SafeAreaView style={styles.container}>
      <ThemedButton
        text="Start an empty workout"
        onPress={() => startWorkout(new Date())}
      />

      <VerticalSpacing size={4} />

      <Box marginHorizontal={12}>
        <Flex direction="row" gap={4} align="center">
          <Divider />

          <ThemedText>Or</ThemedText>

          <Divider />
        </Flex>
      </Box>

      <VerticalSpacing size={4} />

      <ThemedButton text="Choose from a template" variant="outline" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
});

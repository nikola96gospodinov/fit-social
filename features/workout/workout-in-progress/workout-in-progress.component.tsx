import { ThemedButton } from "@/components/ui/themed-button/themed-button.component";
import { ThemedText } from "@/components/ui/themed-text.component";
import { useStore } from "@/store";
import { SafeAreaView, View, StyleSheet } from "react-native";
import { formatDistance } from "date-fns";
import { Flex } from "@/components/ui/layout/flex/flex.component";
import { spacing } from "@/constants/spacing.constants";

export const WorkoutInProgress = () => {
  const { workout, finishWorkout } = useStore();

  const timeAgoStarted = formatDistance(
    workout?.started ?? new Date(),
    new Date(),
    {
      addSuffix: true,
    }
  );

  return (
    <SafeAreaView>
      {/* <View style={styles.header}>
        <Flex align="center" gap={0.5}>
          <ThemedText type="subtitle">Workout started</ThemedText>

          <ThemedText>{timeAgoStarted}</ThemedText>
        </Flex>
      </View> */}

      {/* <ThemedButton text="Finish workout" onPress={finishWorkout} /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    // backgroundColor: "white",
    borderRadius: 20,
    padding: spacing[3],
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#aaa",
  },
});

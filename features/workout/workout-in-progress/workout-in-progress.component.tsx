import { ThemedButton } from "@/components/ui/themed-button/themed-button.component";
import { ThemedText } from "@/components/ui/themed-text.component";
import { useStore } from "@/store";
import { SafeAreaView } from "react-native";

export const WorkoutInProgress = () => {
  const { workout, finishWorkout } = useStore();

  return (
    <SafeAreaView>
      <ThemedText>Workout in progress</ThemedText>

      <ThemedText>{String(workout?.started)}</ThemedText>

      <ThemedButton text="Finish workout" onPress={finishWorkout} />
    </SafeAreaView>
  );
};

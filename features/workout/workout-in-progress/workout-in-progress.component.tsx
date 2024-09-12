import { useActiveWorkoutStore } from "@/store/active-workout-store";
import { View } from "react-native";
import { EmptyWorkout } from "./empty-workout/empty-workout.component";
import { isEmpty } from "lodash";
import { ThemedText } from "@/components/ui/themed-text/themed-text.component";
import { ThemedButton } from "@/components/ui/themed-button/themed-button.component";
import { useRouter } from "expo-router";

export const WorkoutInProgress = () => {
  const { exercises } = useActiveWorkoutStore();

  const router = useRouter();

  if (isEmpty(exercises)) {
    return <EmptyWorkout />;
  }

  return (
    <View style={{ padding: 12 }}>
      <ThemedText type="subtitle">Workout in progress</ThemedText>
      <ThemedText>{`${exercises.length} active exercises`}</ThemedText>
      <ThemedButton
        text="Add more exercises"
        onPress={() => router.push("/workout/add-exercise")}
      />
    </View>
  );
};

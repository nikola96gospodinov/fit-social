import { ThemedTextInput } from "@/src/components/ui/form/themed-text-input/themed-text-input.component";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { useActiveWorkoutStore } from "@/src/store/active-workout-store";
import { View } from "react-native";

export const ActiveExercisesHeader = () => {
  const {
    store: { title, setTitle },
  } = useActiveWorkoutStore();

  return (
    <View>
      <ThemedTextInput
        label="Workout title"
        value={title}
        onChangeText={setTitle}
        size="small"
        width="75%"
        prefix="🏋️‍♂️"
        autoComplete="off"
        autoCorrect={false}
      />

      <VerticalSpacing size={8} />
    </View>
  );
};

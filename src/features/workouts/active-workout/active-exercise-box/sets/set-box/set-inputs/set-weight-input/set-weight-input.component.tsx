import { ThemedTextInput } from "@/src/components/ui/form/themed-text-input/themed-text-input.component";
import {
  ActiveExercise,
  useActiveWorkoutStore,
} from "@/src/store/active-workout-store";
import { ActiveSet } from "@/src/store/active-workout-store";

type Props = {
  set: ActiveSet;
  exercise: ActiveExercise;
};

export const SetWeightInput = ({ set, exercise }: Props) => {
  const {
    store: { updateSet },
  } = useActiveWorkoutStore();

  return (
    <ThemedTextInput
      value={set.weight ? set.weight.toString() : ""}
      keyboardType="numeric"
      width={64}
      onChangeText={(text) => {
        // Only allow numbers and decimal point
        const numericText = text.replace(/[^0-9.]/g, "");
        // Prevent multiple decimal points
        const validText = numericText.replace(/(\..*)\./g, "$1");

        updateSet({
          exerciseId: exercise.exercise_id,
          setId: set.id,
          weight: validText,
        });
      }}
      centerContent
      size="small"
    />
  );
};

import { ThemedTextInput } from "@/src/components/ui/form/themed-text-input/themed-text-input.component";
import {
  ActiveExercise,
  ActiveSet,
  useActiveWorkoutStore,
} from "@/src/store/active-workout-store";

type Props = {
  set: ActiveSet;
  exercise: ActiveExercise;
};

export const SetDistanceInput = ({ set, exercise }: Props) => {
  const {
    store: { updateSet },
  } = useActiveWorkoutStore();

  return (
    <ThemedTextInput
      value={set.distance ? set.distance.toString() : ""}
      keyboardType="numeric"
      width={64}
      onChangeText={(text) => {
        // Only allow numbers and decimal point
        const numericText = text.replace(/[^0-9.]/g, "");
        // Prevent multiple decimal points
        const validText = numericText.replace(/(\..*)\./g, "$1");

        updateSet({
          exercise_id: exercise.exercise_id,
          set_id: set.id,
          distance: validText,
        });
      }}
      centerContent
      size="small"
      inputMode="decimal"
      maxLength={5}
    />
  );
};

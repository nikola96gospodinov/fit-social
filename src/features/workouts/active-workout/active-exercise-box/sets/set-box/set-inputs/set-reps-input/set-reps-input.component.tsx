import { ThemedTextInput } from "@/src/components/ui/form/themed-text-input/themed-text-input.component";
import {
  ActiveExercise,
  useActiveWorkoutStore,
} from "@/src/store/active-workout-store";
import { ActiveSet } from "@/src/store/active-workout-store";

type Props = {
  set: ActiveSet;
  exercise: ActiveExercise;
  isOnlyField: boolean;
};

export const SetRepsInput = ({ set, exercise, isOnlyField }: Props) => {
  const {
    store: { updateSet },
  } = useActiveWorkoutStore();

  return (
    <ThemedTextInput
      value={set.reps ? set.reps.toString() : ""}
      keyboardType="numeric"
      width={isOnlyField ? 128 : 64}
      onChangeText={(text) => {
        const wholeNumber = text.replace(/[^0-9]/g, "");
        updateSet({
          exercise_id: exercise.exercise_id,
          set_id: set.id,
          reps: wholeNumber,
        });
      }}
      centerContent
      size="small"
      inputMode="numeric"
      maxLength={4}
    />
  );
};

import { ThemedButton } from "@/src/components/ui/themed-button/themed-button.component";
import { useGlobalSearchParams } from "expo-router";
import { useEditWorkout } from "@/src/services/workout/edit-workout.service";
import { useActiveWorkoutStore } from "@/src/store/active-workout-store";
import { ThemedToastComponent } from "@/src/components/ui/themed-toast/themed-toast.component";
import { useColorScheme } from "react-native";
import { createEditConfirmationAlert } from "./create-edit-confirmation-alert";
import { useGetProfile } from "@/src/services/profile/get-profile.service";

export const EditWorkoutRightHeader = () => {
  const theme = useColorScheme() ?? "light";

  const { id } = useGlobalSearchParams();

  const { data: profile } = useGetProfile();

  const handle = profile?.handle;

  const { mutate: editWorkout, isPending, isError } = useEditWorkout(handle);

  const {
    store: { title, started, ended, exercises, sets },
  } = useActiveWorkoutStore();

  const onPress = () => {
    const allSetsAreValid =
      sets.every((set) => set.reps && set.reps > 0 && set.is_done) &&
      sets.length > 0;

    const args = {
      workoutId: id as string,
      workoutTitle: title,
      workoutStarted: started?.toISOString() ?? "",
      workoutEnded: ended?.toISOString() ?? "",
      exercisesData: exercises,
      setsData: sets,
    };

    if (!allSetsAreValid) {
      createEditConfirmationAlert({ onPress: () => editWorkout(args), theme });
      return;
    }

    editWorkout(args);
  };

  return (
    <>
      <ThemedButton
        text="Save"
        variant="flat"
        icon="save"
        disabled={!handle || !id || isPending}
        isLoading={isPending}
        onPress={onPress}
      />

      <ThemedToastComponent
        text="Error updating workout"
        type="error"
        visible={isError}
      />
    </>
  );
};

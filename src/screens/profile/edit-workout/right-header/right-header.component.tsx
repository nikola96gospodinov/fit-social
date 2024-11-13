import { ThemedButton } from "@/src/components/ui/themed-button/themed-button.component";
import { useGetOwnProfile } from "@/src/services/profile/get-own-profile.service";
import { useGlobalSearchParams } from "expo-router";
import { useEditWorkout } from "@/src/services/workout/edit-workout.service";
import { useActiveWorkoutStore } from "@/src/store/active-workout-store";
import { ThemedToastComponent } from "@/src/components/ui/themed-toast/themed-toast.component";

export const EditWorkoutRightHeader = () => {
  const { id } = useGlobalSearchParams();

  const { data: profile } = useGetOwnProfile();

  const { mutate: editWorkout, isPending, isError } = useEditWorkout();

  const {
    store: { title, started, ended, exercises, sets },
  } = useActiveWorkoutStore();

  const handle = profile?.handle;

  return (
    <>
      <ThemedButton
        text="Save"
        variant="flat"
        icon="save"
        disabled={!handle || !id || isPending}
        isLoading={isPending}
        onPress={() =>
          editWorkout({
            workoutId: id as string,
            workoutTitle: title,
            workoutStarted: started?.toISOString() ?? "",
            workoutEnded: ended?.toISOString() ?? "",
            exercisesData: JSON.stringify(exercises),
            setsData: JSON.stringify(sets),
          })
        }
      />

      <ThemedToastComponent
        text="Error updating workout"
        type="error"
        visible={isError}
      />
    </>
  );
};

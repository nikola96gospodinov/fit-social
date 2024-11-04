import { ThemedButton } from "@/src/components/ui/themed-button/themed-button.component";
import { useGetOwnProfile } from "@/src/services/profile/get-own-profile.service";
import { useDeleteWorkout } from "@/src/services/workout/delete-workout.service";
import { useGlobalSearchParams } from "expo-router";

export const EditWorkoutRightHeader = () => {
  const { id } = useGlobalSearchParams();

  const { data: profile } = useGetOwnProfile();

  const handle = profile?.handle;

  const { mutate: deleteWorkout } = useDeleteWorkout(handle);

  return (
    <ThemedButton
      text="Delete"
      variant="flatError"
      icon="trash"
      size="sm"
      disabled={!handle || !id}
      onPress={() => deleteWorkout(id as string)}
    />
  );
};

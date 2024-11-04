import { ThemedButton } from "@/src/components/ui/themed-button/themed-button.component";
import { useGetOwnProfile } from "@/src/services/profile/get-own-profile.service";
import { useDeleteWorkout } from "@/src/services/workout/delete-workout.service";
import { useGlobalSearchParams } from "expo-router";
import { createDeleteConfirmation } from "./create-delete-confirmation";
import { useColorScheme } from "react-native";

export const EditWorkoutRightHeader = () => {
  const colorScheme = useColorScheme() ?? "light";

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
      onPress={() =>
        createDeleteConfirmation({
          onDelete: () => deleteWorkout(id as string),
          colorScheme: colorScheme,
        })
      }
    />
  );
};

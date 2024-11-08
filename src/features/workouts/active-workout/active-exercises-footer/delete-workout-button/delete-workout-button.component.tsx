import { ThemedButton } from "@/src/components/ui/themed-button/themed-button.component";
import { useGetOwnProfile } from "@/src/services/profile/get-own-profile.service";
import { useDeleteWorkout } from "@/src/services/workout/delete-workout.service";
import { useGlobalSearchParams } from "expo-router";
import { useColorScheme } from "react-native";
import { createDeleteConfirmation } from "./create-delete-confirmation";

export const DeleteWorkoutButton = () => {
  const colorScheme = useColorScheme() ?? "light";

  const { id } = useGlobalSearchParams();

  const { data: profile } = useGetOwnProfile();

  const handle = profile?.handle;

  const { mutate: deleteWorkout } = useDeleteWorkout(handle);

  return (
    <ThemedButton
      text="Delete"
      variant="error"
      icon="trash"
      size="sm"
      isFullWidth
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

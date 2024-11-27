import { ThemedButton } from "@/src/components/ui/themed-button/themed-button.component";
import { useDeleteWorkout } from "@/src/services/workout/delete-workout.service";
import { useGlobalSearchParams } from "expo-router";
import { useColorScheme } from "react-native";
import { createDeleteConfirmation } from "./create-delete-confirmation";
import { useGetProfile } from "@/src/services/profile/get-profile.service";

export const DeleteWorkoutButton = () => {
  const colorScheme = useColorScheme() ?? "light";

  const { id } = useGlobalSearchParams();

  const { data: profile } = useGetProfile();

  const { mutate: deleteWorkout } = useDeleteWorkout(profile?.id);

  return (
    <ThemedButton
      text="Delete"
      variant="error"
      icon="trash"
      size="sm"
      isFullWidth
      disabled={!profile?.id || !id}
      onPress={() =>
        createDeleteConfirmation({
          onDelete: () => deleteWorkout(id as string),
          colorScheme: colorScheme,
        })
      }
    />
  );
};

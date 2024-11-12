import { ThemedButton } from "@/src/components/ui/themed-button/themed-button.component";
import { useGetOwnProfile } from "@/src/services/profile/get-own-profile.service";
import { useGlobalSearchParams } from "expo-router";
import { createDeleteConfirmation } from "../../../../features/workouts/active-workout/active-exercises-footer/delete-workout-button/create-delete-confirmation";
import { useColorScheme } from "react-native";

export const EditWorkoutRightHeader = () => {
  const colorScheme = useColorScheme() ?? "light";

  const { id } = useGlobalSearchParams();

  const { data: profile } = useGetOwnProfile();

  const handle = profile?.handle;

  return (
    <ThemedButton
      text="Save"
      variant="flat"
      icon="save"
      disabled={!handle || !id}
      onPress={() =>
        createDeleteConfirmation({
          onDelete: () => {},
          colorScheme: colorScheme,
        })
      }
    />
  );
};

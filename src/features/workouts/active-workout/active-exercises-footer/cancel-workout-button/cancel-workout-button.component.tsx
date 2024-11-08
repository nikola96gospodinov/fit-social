import { ThemedButton } from "@/src/components/ui/themed-button/themed-button.component";
import { useActiveWorkoutStore } from "@/src/store/active-workout-store";
import { useColorScheme } from "react-native";
import { createCancelWorkoutAlert } from "./create-cancel-workout-modal";

export const CancelWorkoutButton = () => {
  const theme = useColorScheme() ?? "light";

  const {
    store: { resetWorkout },
  } = useActiveWorkoutStore();

  return (
    <ThemedButton
      text="Cancel workout"
      variant="flatError"
      size="sm"
      onPress={() =>
        createCancelWorkoutAlert({
          cancelWorkout: resetWorkout,
          colorScheme: theme,
        })
      }
      isFullWidth
    />
  );
};

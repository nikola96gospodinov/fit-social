import { FullScreenCenteredView } from "@/src/components/ui/layout/full-screen-centered-view/full-screen-centered-view.component";
import { OrSeparator } from "@/src/components/or-separator/or-separator.component";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ThemedButton } from "@/src/components/ui/themed-button/themed-button.component";
import { useActiveWorkoutStore } from "@/src/store/active-workout-store";
import { useRouter } from "expo-router";
import { useColorScheme } from "react-native";
import { createCancelConfirmationAlert } from "./create-cancel-confirmation-alert";

export const EmptyWorkout = () => {
  const {
    store: { resetWorkout },
  } = useActiveWorkoutStore();

  const router = useRouter();

  const colorScheme = useColorScheme() ?? "light";

  return (
    <FullScreenCenteredView>
      <ThemedButton
        text="Add exercise(s)"
        onPress={() => router.push("/workout/add-exercise")}
        isFullWidth
      />

      <VerticalSpacing size={4} />

      <OrSeparator />

      <VerticalSpacing size={4} />

      <ThemedButton
        text="Cancel workout"
        variant="outline"
        onPress={() =>
          createCancelConfirmationAlert({
            colorScheme,
            cancelWorkout: resetWorkout,
          })
        }
        isFullWidth
      />
    </FullScreenCenteredView>
  );
};

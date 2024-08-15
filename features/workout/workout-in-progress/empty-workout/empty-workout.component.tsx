import { FullScreenCenteredView } from "@/components/full-screen-centered-view/full-screen-centered-view.component";
import { OrSeparator } from "@/components/or-separator/or-separator.component";
import { VerticalSpacing } from "@/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ThemedButton } from "@/components/ui/themed-button/themed-button.component";
import { useActiveWorkoutStore } from "@/store/active-workout-store";
import { useRouter } from "expo-router";
import { useColorScheme } from "react-native";
import { createCancelConfirmationAlert } from "./create-cancel-confirmation-alert";

export const EmptyWorkout = () => {
  const { finishWorkout } = useActiveWorkoutStore();

  const router = useRouter();

  const colorScheme = useColorScheme();

  return (
    <FullScreenCenteredView>
      <ThemedButton
        text="Add exercise(s)"
        onPress={() => router.push("/workout/add-exercise")}
      />

      <VerticalSpacing size={4} />

      <OrSeparator />

      <VerticalSpacing size={4} />

      <ThemedButton
        text="Cancel workout"
        variant="outline"
        onPress={() =>
          createCancelConfirmationAlert({ colorScheme, finishWorkout })
        }
      />
    </FullScreenCenteredView>
  );
};

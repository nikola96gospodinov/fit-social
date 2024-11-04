import { OrSeparator } from "@/src/components/or-separator/or-separator.component";
import { FullScreenCenteredView } from "@/src/components/ui/layout/full-screen-centered-view/full-screen-centered-view.component";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ThemedButton } from "@/src/components/ui/themed-button/themed-button.component";
import { useActiveWorkoutStore } from "@/src/store/active-workout-store";

export const StartWorkout = () => {
  const { startWorkout } = useActiveWorkoutStore();

  return (
    <FullScreenCenteredView>
      <ThemedButton
        text="Start an empty workout"
        onPress={() => startWorkout()}
        isFullWidth
      />

      <VerticalSpacing size={4} />

      <OrSeparator />

      <VerticalSpacing size={4} />

      <ThemedButton
        text="Choose from a template"
        variant="outline"
        isFullWidth
      />
    </FullScreenCenteredView>
  );
};

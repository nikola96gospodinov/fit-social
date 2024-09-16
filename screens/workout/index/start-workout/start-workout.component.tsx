import { OrSeparator } from "@/components/or-separator/or-separator.component";
import { FullScreenCenteredView } from "@/components/ui/layout/full-screen-centered-view/full-screen-centered-view.component";
import { VerticalSpacing } from "@/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ThemedButton } from "@/components/ui/themed-button/themed-button.component";
import { useActiveWorkoutStore } from "@/store/active-workout-store";

export const StartWorkout = () => {
  const { startWorkout } = useActiveWorkoutStore();

  return (
    <FullScreenCenteredView>
      <ThemedButton
        text="Start an empty workout"
        onPress={() => startWorkout(new Date())}
      />

      <VerticalSpacing size={4} />

      <OrSeparator />

      <VerticalSpacing size={4} />

      <ThemedButton text="Choose from a template" variant="outline" />
    </FullScreenCenteredView>
  );
};

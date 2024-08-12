import { FullScreenCenteredView } from "@/components/full-screen-centered-view/full-screen-centered-view.component";
import { OrSeparator } from "@/components/or-separator/or-separator.component";
import { VerticalSpacing } from "@/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ThemedButton } from "@/components/ui/themed-button/themed-button.component";
import { useStore } from "@/store";

export const EmptyWorkout = () => {
  const { finishWorkout } = useStore();

  return (
    <FullScreenCenteredView>
      <ThemedButton text="Add exercise(s)" />

      <VerticalSpacing size={4} />

      <OrSeparator />

      <VerticalSpacing size={4} />

      <ThemedButton
        text="Cancel workout"
        variant="outline"
        onPress={finishWorkout}
      />
    </FullScreenCenteredView>
  );
};

import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";

export const HomeGymSuggestionsListHeader = () => {
  return (
    <>
      <ThemedText type="small" color="supporting">
        People from your gym
      </ThemedText>

      <VerticalSpacing size={4} />
    </>
  );
};

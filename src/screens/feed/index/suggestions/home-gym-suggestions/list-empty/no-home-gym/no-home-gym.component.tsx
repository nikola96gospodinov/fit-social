import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ThemedButton } from "@/src/components/ui/themed-button/themed-button.component";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { router } from "expo-router";

export const NoHomeGym = () => {
  return (
    <>
      <ThemedText>Set a home gym to see suggestions</ThemedText>

      <VerticalSpacing size={2} />

      <ThemedButton
        size="sm"
        text="Set home gym"
        onPress={() => router.push("/profile/set-home-gym")}
      />
    </>
  );
};

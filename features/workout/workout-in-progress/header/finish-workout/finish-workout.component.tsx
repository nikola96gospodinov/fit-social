import { ThemedButton } from "@/components/ui/themed-button/themed-button.component";
import { spacing } from "@/constants/spacing.constants";
import { useStore } from "@/store";
import { View } from "react-native";

export const FinishWorkout = () => {
  const { finishWorkout } = useStore();

  return (
    <View style={{ marginRight: spacing[4] }}>
      <ThemedButton text="Finish" variant="flat" onPress={finishWorkout} />
    </View>
  );
};

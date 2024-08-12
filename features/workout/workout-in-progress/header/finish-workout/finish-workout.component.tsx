import { ThemedButton } from "@/components/ui/themed-button/themed-button.component";
import { useStore } from "@/store";
import { View } from "react-native";

export const FinishWorkout = () => {
  const { finishWorkout } = useStore();

  return (
    <View style={{ marginRight: 12 }}>
      <ThemedButton text="Finish" variant="flat" onPress={finishWorkout} />
    </View>
  );
};

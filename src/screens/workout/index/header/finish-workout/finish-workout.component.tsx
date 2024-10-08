import { ThemedButton } from "@/src/components/ui/themed-button/themed-button.component";
import { useActiveWorkoutStore } from "@/src/store/active-workout-store";
import { useColorScheme, View } from "react-native";
import { createFinishConfirmationAlert } from "./create-finish-confirmation-alert";

export const FinishWorkout = () => {
  const { finishWorkout } = useActiveWorkoutStore();

  const theme = useColorScheme() ?? "light";

  return (
    <View>
      <ThemedButton
        text="Finish"
        variant="flat"
        onPress={() => createFinishConfirmationAlert({ finishWorkout, theme })}
      />
    </View>
  );
};

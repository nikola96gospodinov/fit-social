import { ThemedButton } from "@/components/ui/themed-button/themed-button.component";
import { spacing } from "@/constants/spacing.constants";
import { useStore } from "@/store";
import { useColorScheme, View } from "react-native";
import { createFinishConfirmationAlert } from "./create-finish-confirmation-alert";

export const FinishWorkout = () => {
  const { finishWorkout } = useStore();

  const colorScheme = useColorScheme();

  return (
    <View>
      <ThemedButton
        text="Finish"
        variant="flat"
        onPress={() =>
          createFinishConfirmationAlert({ finishWorkout, colorScheme })
        }
      />
    </View>
  );
};

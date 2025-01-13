import { ThemedButton } from "@/src/components/ui/themed-button/themed-button.component";
import { useColorScheme, View } from "react-native";
import { createFinishConfirmationAlert } from "./create-finish-confirmation-alert";
import { useAddWorkout } from "@/src/services/workout/add-workout.service";
import { ThemedToastComponent } from "@/src/components/ui/themed-toast/themed-toast.component";
import { useActiveWorkoutStore } from "@/src/store/active-workout-store";
import { getToastType } from "@/src/utils/toasts.utils";

export const FinishWorkout = () => {
  const {
    store: { resetWorkout, sets, exercises, started, title },
  } = useActiveWorkoutStore();

  const { mutate: addWorkout, isPending, isError, isSuccess } = useAddWorkout();

  const theme = useColorScheme() ?? "light";

  const toastType = getToastType(isError, isSuccess);

  const toastText = (() => {
    if (isError) return "Error adding workout";
    if (isSuccess) return "Workout added successfully";
    return "Adding workout...";
  })();

  return (
    <View>
      <ThemedButton
        text="Finish"
        variant="flat"
        onPress={() =>
          createFinishConfirmationAlert({
            finishWorkout: () =>
              addWorkout({ exercises, started, sets, title }),
            theme,
            resetWorkout,
            sets,
          })
        }
      />

      <ThemedToastComponent
        text={toastText}
        type={toastType}
        visible={isPending || isError || isSuccess}
      />
    </View>
  );
};

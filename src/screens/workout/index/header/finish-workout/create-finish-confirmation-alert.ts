import { useActiveWorkoutStore } from "@/src/store/active-workout-store";
import { Alert, ColorSchemeName } from "react-native";

type Props = {
  finishWorkout: () => void;
  theme: ColorSchemeName;
  resetWorkout: () => void;
};

export const createFinishConfirmationAlert = ({
  finishWorkout,
  theme,
  resetWorkout,
}: Props) => {
  const { sets } = useActiveWorkoutStore.getState();

  const hasSets = sets.some((set) => set.reps && set.reps > 0 && set.is_done);
  const allSetsAreValid =
    sets.every((set) => set.reps && set.reps > 0 && set.is_done) &&
    sets.length > 0;

  const onPress = () => {
    if (hasSets) finishWorkout();
    else resetWorkout();
  };

  const title = hasSets ? "Finish workout" : "Discard workout";

  const message = (() => {
    if (allSetsAreValid) {
      return "Are you sure you want to finish the workout?";
    }

    if (!hasSets) {
      return "You don't have any completed sets or sets with weight in this workout. Are you sure you want to discard it?";
    }

    return "There are incomplete sets or sets with no reps. Are you sure you want to finish the workout? Doing so will discard all sets with no reps or incomplete sets.";
  })();

  Alert.alert(
    title,
    message,
    [
      {
        text: "Yes",
        onPress,
        isPreferred: true,
      },
      {
        text: "No",
        style: "cancel",
      },
    ],
    {
      cancelable: true,
      userInterfaceStyle: theme ?? "light",
    },
  );
};

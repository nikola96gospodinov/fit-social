import { isSetUsable } from "@/src/features/workouts/utils/is-set-usable.utils";
import { ActiveExercise, ActiveSet } from "@/src/store/active-workout-store";
import { Alert, ColorSchemeName } from "react-native";

type Props = {
  finishWorkout: () => void;
  theme: ColorSchemeName;
  resetWorkout: () => void;
  sets: ActiveSet[];
  exercises: ActiveExercise[];
};

export const createFinishConfirmationAlert = ({
  finishWorkout,
  theme,
  resetWorkout,
  sets,
  exercises,
}: Props) => {
  const hasSets = sets.some((set) => isSetUsable({ set, exercises }));
  const allSetsAreValid =
    sets.every((set) => isSetUsable({ set, exercises })) && sets.length > 0;

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

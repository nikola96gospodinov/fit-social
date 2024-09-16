import { Alert, ColorSchemeName } from "react-native";

type Props = {
  finishWorkout: () => void;
  theme: ColorSchemeName;
};

export const createFinishConfirmationAlert = ({
  finishWorkout,
  theme,
}: Props) => {
  Alert.alert(
    "Finish workout",
    "Are you sure you want to finish the workout?",
    [
      {
        text: "Yes",
        onPress: finishWorkout,
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

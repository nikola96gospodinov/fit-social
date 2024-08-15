import { Alert, ColorSchemeName } from "react-native";

type Props = {
  finishWorkout: () => void;
  colorScheme: ColorSchemeName;
};

export const createFinishConfirmationAlert = ({
  finishWorkout,
  colorScheme,
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
      userInterfaceStyle: colorScheme ?? "light",
    }
  );
};

import { Alert, ColorSchemeName } from "react-native";

type Props = {
  finishWorkout: () => void;
  colorScheme: ColorSchemeName;
};

export const createCancelConfirmationAlert = ({
  colorScheme,
  finishWorkout,
}: Props) => {
  Alert.alert(
    "Cancel workout",
    "Are you sure you want to cancel the workout?",
    [
      {
        text: "Yes",
        onPress: finishWorkout,
        style: "destructive",
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
    },
  );
};

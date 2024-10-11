import { Alert, ColorSchemeName } from "react-native";

type Props = {
  cancelWorkout: () => void;
  colorScheme: ColorSchemeName;
};

export const createCancelConfirmationAlert = ({
  colorScheme,
  cancelWorkout,
}: Props) => {
  Alert.alert(
    "Cancel workout",
    "Are you sure you want to cancel the workout?",
    [
      {
        text: "Yes",
        onPress: cancelWorkout,
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

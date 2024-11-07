import { Alert, ColorSchemeName } from "react-native";

type Props = {
  cancelWorkout: () => void;
  colorScheme: ColorSchemeName;
};

export const createCancelWorkoutAlert = ({
  cancelWorkout,
  colorScheme,
}: Props) => {
  Alert.alert(
    "Cancel workout",
    "Are you sure you want to cancel this workout?",
    [
      {
        text: "Yes",
        onPress: cancelWorkout,
        style: "destructive",
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

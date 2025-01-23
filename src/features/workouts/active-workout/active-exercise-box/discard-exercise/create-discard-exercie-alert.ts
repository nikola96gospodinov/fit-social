import { Alert, ColorSchemeName } from "react-native";

type Props = {
  discardExercise: () => void;
  colorScheme: ColorSchemeName;
};

export const createDiscardExerciseAlert = ({
  discardExercise,
  colorScheme,
}: Props) => {
  Alert.alert(
    "Discard exercise",
    "Are you sure you want to discard this exercise?",
    [
      {
        text: "Yes",
        onPress: discardExercise,
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

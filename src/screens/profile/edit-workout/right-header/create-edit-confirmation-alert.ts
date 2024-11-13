import { Alert, ColorSchemeName } from "react-native";

type Props = {
  onPress: () => void;
  theme: NonNullable<ColorSchemeName>;
};

export const createEditConfirmationAlert = ({ onPress, theme }: Props) => {
  Alert.alert(
    "There are incomplete sets or sets with no reps.",
    "Are you sure you want to save the workout? The incomplete sets are going to be removed",
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
      userInterfaceStyle: theme,
    },
  );
};

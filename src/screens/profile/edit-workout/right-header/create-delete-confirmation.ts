import { Alert, ColorSchemeName } from "react-native";

type Props = {
  onDelete: () => void;
  colorScheme: ColorSchemeName;
};

export const createDeleteConfirmation = ({ onDelete, colorScheme }: Props) => {
  Alert.alert(
    "Delete workout",
    "Are you sure you want to delete this workout?",
    [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: onDelete,
        isPreferred: true,
      },
    ],
    {
      cancelable: true,
      userInterfaceStyle: colorScheme ?? "light",
    },
  );
};

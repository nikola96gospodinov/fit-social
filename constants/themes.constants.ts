import { Theme } from "@react-navigation/native";
import { red, colors } from "./colors.constants";

export const DarkTheme: Theme = {
  dark: true,
  colors: {
    primary: colors.dark.tintText,
    background: colors.dark.background,
    card: colors.dark.cardBackground,
    text: colors.dark.text,
    border: colors.dark.border,
    notification: red[700],
  },
};

export const DefaultTheme: Theme = {
  dark: false,
  colors: {
    primary: colors.light.tintText,
    background: colors.light.background,
    card: colors.light.cardBackground,
    text: colors.light.text,
    border: colors.light.border,
    notification: red[600],
  },
};

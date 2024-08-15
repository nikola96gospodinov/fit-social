import { Theme } from "@react-navigation/native";
import { red, slate, indigo } from "./colors.constants";

export const DarkTheme: Theme = {
  dark: true,
  colors: {
    primary: indigo[300],
    background: slate[950],
    card: slate[900],
    text: slate[200],
    border: slate[700],
    notification: red[700],
  },
};

export const DefaultTheme: Theme = {
  dark: false,
  colors: {
    primary: indigo[800],
    background: slate[100],
    card: slate[50],
    text: slate[800],
    border: slate[300],
    notification: red[600],
  },
};

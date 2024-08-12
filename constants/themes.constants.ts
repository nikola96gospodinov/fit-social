import { Theme } from "@react-navigation/native";

export const DarkTheme: Theme = {
  dark: true,
  colors: {
    primary: "#4338ca",
    background: "#020617",
    card: "#0f172a",
    text: "#e2e8f0",
    border: "#334155",
    notification: "#b91c1c",
  },
};

export const DefaultTheme: Theme = {
  dark: false,
  colors: {
    primary: "#3730a3",
    background: "#f1f5f9",
    card: "#f8fafc",
    text: "#1e293b",
    border: "#cbd5e1",
    notification: "#dc2626",
  },
};

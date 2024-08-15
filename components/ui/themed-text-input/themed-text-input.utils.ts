import { ColorSchemeName, StyleSheet } from "react-native";
import { Mode } from "./themed-text-input.types";
import { colors } from "@/constants/colors.constants";

type GetModeStylesProps = {
  mode: Mode;
  theme: NonNullable<ColorSchemeName>;
  isFocused?: boolean;
};

export const getModeStyles = ({
  mode,
  theme,
  isFocused,
}: GetModeStylesProps) => {
  const themeColors = colors[theme];

  switch (mode) {
    case "error":
      return StyleSheet.create({
        container: {
          backgroundColor: themeColors.destructiveBackground,
          borderColor: themeColors.destructive,
          borderWidth: 1,
        },

        input: {
          color: themeColors.text,
        },
      });

    default:
      const borderColor = isFocused
        ? themeColors.borderFocused
        : themeColors.border;

      return StyleSheet.create({
        container: {
          backgroundColor: themeColors.background,
          borderColor,
          borderWidth: 1,
        },

        input: {
          color: themeColors.text,
        },
      });
  }
};

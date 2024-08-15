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
        input: {
          backgroundColor: themeColors.destructiveBackground,
          color: themeColors.text,
          borderColor: themeColors.destructive,
          borderWidth: 1,
        },
      });

    default:
      return StyleSheet.create({
        input: {
          backgroundColor: themeColors.background,
          color: themeColors.text,
          borderColor: isFocused
            ? themeColors.borderFocused
            : themeColors.border,
          borderWidth: 1,
        },
      });
  }
};

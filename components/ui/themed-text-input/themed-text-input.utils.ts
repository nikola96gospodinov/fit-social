import { ColorSchemeName, StyleSheet } from "react-native";
import { Mode, Size } from "./themed-text-input.types";
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
          borderColor: themeColors.destructiveBorder,
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
          backgroundColor: themeColors.sectionBackground,
          borderColor,
          borderWidth: 1,
        },

        input: {
          color: themeColors.text,
        },
      });
  }
};

type GetSizeStylesProps = {
  size: Size;
  isIcon?: boolean;
};

export const getSizeStyles = ({ size, isIcon }: GetSizeStylesProps) => {
  switch (size) {
    case "small":
      return StyleSheet.create({
        container: {
          paddingVertical: 4,
          borderRadius: 12,
          ...(!isIcon && { paddingHorizontal: 12 }),
        },
      });

    default:
      return StyleSheet.create({
        container: {
          padding: 8,
          borderRadius: 24,
          ...(!isIcon && { paddingHorizontal: 12 }),
        },
      });
  }
};

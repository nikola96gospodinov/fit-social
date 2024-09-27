import { ColorSchemeName, StyleSheet } from "react-native";
import { Size } from "./themed-text-input.types";
import { colors } from "@/constants/colors.constants";

type GetModeStylesProps = {
  theme: NonNullable<ColorSchemeName>;
  isFocused?: boolean;
  isError?: boolean;
};

export const getModeStyles = ({
  isError,
  theme,
  isFocused,
}: GetModeStylesProps) => {
  const themeColors = colors[theme];

  if (isError) {
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
  }

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

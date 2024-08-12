import { colors } from "@/constants/colors.constants";
import { ColorSchemeName, StyleSheet } from "react-native";
import { Size, Variant } from "./themed-button.types";

const getVariantStyles = ({ variant, theme }: Omit<Props, "size">) => {
  const themeColors = colors[theme];

  switch (variant) {
    case "outline": {
      return StyleSheet.create({
        pressable: {
          backgroundColor: "transparent",
          borderColor: themeColors.fill,
          borderWidth: 1,
        },

        pressableTap: {
          backgroundColor: themeColors.fillOnTap,
        },

        text: {
          color: themeColors.fill,
        },

        textTap: {
          color: themeColors.background,
        },
      });
    }

    case "flat": {
      return StyleSheet.create({
        pressable: {
          backgroundColor: "transparent",
        },

        pressableTap: {},

        text: {
          color: themeColors.tint,
        },

        textTap: {},
      });
    }

    // case "primary"
    default: {
      return StyleSheet.create({
        pressable: {
          backgroundColor: themeColors.fill,
        },

        pressableTap: {
          backgroundColor: themeColors.fillOnTap,
        },

        text: {
          color: themeColors.fillTextColor,
        },

        textTap: {},
      });
    }
  }
};

const getSizeStyles = (size: Size) => {
  switch (size) {
    case "sm": {
      return StyleSheet.create({
        pressable: {
          borderRadius: 8,
          paddingHorizontal: 12,
          paddingVertical: 8,
        },

        text: {
          fontSize: 14,
        },
      });
    }

    case "lg": {
      return StyleSheet.create({
        pressable: {
          borderRadius: 12,
          paddingHorizontal: 20,
          paddingVertical: 12,
        },

        text: {
          fontSize: 18,
        },
      });
    }

    // case "md"
    default: {
      return StyleSheet.create({
        pressable: {
          borderRadius: 8,
          paddingHorizontal: 16,
          paddingVertical: 12,
        },

        text: {
          fontSize: 16,
        },
      });
    }
  }
};

type Props = {
  variant: Variant;
  theme: NonNullable<ColorSchemeName>;
  size: Size;
};

export const getButtonStyles = ({ variant, size, theme }: Props) => {
  const variantStyles = getVariantStyles({ variant, theme });
  const sizeStyles = getSizeStyles(size);

  const isFlat = variant === "flat";

  return {
    pressable: [
      variantStyles.pressable,
      ...(isFlat ? [] : [sizeStyles.pressable]),
    ],
    pressableTap: variantStyles.pressableTap,
    text: [variantStyles.text, sizeStyles.text],
    textTap: variantStyles.textTap,
  };
};

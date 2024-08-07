import { colors } from "@/constants/colors.constants";
import { ColorSchemeName, StyleSheet } from "react-native";
import { Size, Variant } from "./themed-button.types";
import { merge } from "lodash";

export const getVariantStyles = ({ variant, theme }: Omit<Props, "size">) => {
  const themeColors = colors[theme];

  switch (variant) {
    case "outline": {
      return {
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
      };
    }

    // case "primary"
    default: {
      return {
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
      };
    }
  }
};

export const getSizeStyles = (size: Size) => {
  switch (size) {
    case "sm": {
      return {
        pressable: {
          borderRadius: 8,
          paddingHorizontal: 12,
          paddingVertical: 8,
        },

        text: {
          fontSize: 14,
        },
      };
    }

    case "lg": {
      return {
        pressable: {
          borderRadius: 12,
          paddingHorizontal: 20,
          paddingVertical: 12,
        },

        text: {
          fontSize: 18,
        },
      };
    }

    // case "md"
    default: {
      return {
        pressable: {
          borderRadius: 8,
          paddingHorizontal: 16,
          paddingVertical: 12,
        },

        text: {
          fontSize: 16,
        },
      };
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

  const mergedStyles = merge(variantStyles, sizeStyles);

  return StyleSheet.create(mergedStyles);
};

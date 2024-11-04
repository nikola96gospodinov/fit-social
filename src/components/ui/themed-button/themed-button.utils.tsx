import { colors } from "@/src/constants/colors.constants";
import { ColorSchemeName, StyleSheet } from "react-native";
import { Size, Variant } from "./themed-button.types";

const getVariantStyles = ({
  variant,
  theme,
  isDisabled,
}: Pick<Props, "theme" | "variant" | "isDisabled">) => {
  const themeColors = colors[theme];

  if (isDisabled) {
    return StyleSheet.create({
      pressable: {
        backgroundColor:
          variant === "link" || variant === "flat"
            ? "transparent"
            : themeColors.buttonFillDisabled,
      },

      pressableTap: {},

      text: {
        color: themeColors.buttonFillOnTap,
      },

      textTap: {},
    });
  }

  switch (variant) {
    case "outline": {
      return StyleSheet.create({
        pressable: {
          backgroundColor: "transparent",
          borderColor: themeColors.buttonFill,
          borderWidth: 1,
        },

        pressableTap: {
          backgroundColor: themeColors.buttonFillOnTap,
        },

        text: {
          color: themeColors.buttonFill,
        },

        textTap: {
          color: themeColors.invertedText,
        },
      });
    }

    case "flat": {
      return StyleSheet.create({
        pressable: {
          backgroundColor: "transparent",
        },

        pressableTap: {
          backgroundColor: themeColors.sectionBackground,
        },

        text: {
          color: themeColors.tintText,
        },

        textTap: {},
      });
    }

    case "error": {
      return StyleSheet.create({
        pressable: {
          backgroundColor: themeColors.destructiveBackground,
        },

        pressableTap: {},

        text: {
          color: themeColors.destructiveText,
        },

        textTap: {},
      });
    }

    case "link": {
      return StyleSheet.create({
        pressable: {
          backgroundColor: "transparent",
        },

        pressableTap: {},

        text: {
          color: themeColors.tintText,
        },

        textTap: {},
      });
    }

    case "flatError": {
      return StyleSheet.create({
        pressable: {
          backgroundColor: "transparent",
        },

        pressableTap: {},

        text: {
          color: themeColors.destructiveBorder,
        },

        textTap: {},
      });
    }

    // case "primary"
    default: {
      return StyleSheet.create({
        pressable: {
          backgroundColor: themeColors.buttonFill,
        },

        pressableTap: {
          backgroundColor: themeColors.buttonFillOnTap,
        },

        text: {
          color: themeColors.buttonTextColor,
        },

        textTap: {},
      });
    }
  }
};

const getSizeStyles = (size: Size) => {
  switch (size) {
    case "xs": {
      return StyleSheet.create({
        pressable: {
          borderRadius: 8,
          paddingHorizontal: 10,
          paddingVertical: 6,
        },

        text: {
          fontSize: 12,
        },
      });
    }

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
          paddingVertical: 10,
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
  isDisabled?: boolean | null;
};

export const getButtonStyles = ({
  variant,
  size,
  theme,
  isDisabled,
}: Props) => {
  const variantStyles = getVariantStyles({ variant, theme, isDisabled });
  const sizeStyles = getSizeStyles(size);

  const isFlat = variant === "flat" || variant === "flatError";
  const isLink = variant === "link";

  const pressableSizeStyles = (() => {
    if (isLink) return [];
    if (isFlat) return [styles.flatButtonContainer];
    return [sizeStyles.pressable];
  })();

  return {
    pressable: [variantStyles.pressable, ...pressableSizeStyles],
    pressableTap: variantStyles.pressableTap,
    text: [variantStyles.text, sizeStyles.text],
    textTap: variantStyles.textTap,
    iconSize: sizeStyles.text.fontSize,
    iconColor: variantStyles.text.color,
  };
};

const styles = StyleSheet.create({
  flatButtonContainer: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
});

import { colors } from "@/constants/colors.constants";
import { ColorSchemeName, StyleSheet } from "react-native";
import { Size, Variant } from "./themed-button.types";

const getVariantStyles = ({
  variant,
  theme,
}: Pick<Props, "theme" | "variant">) => {
  const themeColors = colors[theme];

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
  isFullWidth?: boolean;
};

export const getButtonStyles = ({ variant, size, theme }: Props) => {
  const variantStyles = getVariantStyles({ variant, theme });
  const sizeStyles = getSizeStyles(size);

  const isFlat = variant === "flat";
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
  };
};

const styles = StyleSheet.create({
  flatButtonContainer: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
});

import { colors } from "@/src/constants/colors.constants";
import { Text, type TextProps, StyleSheet, useColorScheme } from "react-native";

export type ThemedTextProps = TextProps & {
  type?: "default" | "title" | "subtitle" | "small";
  color?:
    | "default"
    | "inverted"
    | "supporting"
    | "error"
    | "tintText"
    | "tintBackgroundText";
  isCentered?: boolean;
};

export function ThemedText({
  style,
  type = "default",
  color = "default",
  isCentered = false,
  ...rest
}: ThemedTextProps) {
  const theme = useColorScheme() ?? "light";

  const defaultColor = colors[theme].text;
  const tintTextColor = colors[theme].tintText;
  const tintBackgroundTextColor = colors[theme].tintBackgroundText;
  const supportingColor = colors[theme].supportingText;
  const errorColor = colors[theme].destructiveText;
  const invertedColor = colors[theme].invertedText;

  const colorValue = (() => {
    switch (color) {
      case "tintText":
        return tintTextColor;
      case "tintBackgroundText":
        return tintBackgroundTextColor;
      case "supporting":
        return supportingColor;
      case "error":
        return errorColor;
      case "inverted":
        return invertedColor;
      default:
        return defaultColor;
    }
  })();

  return (
    <Text
      style={[
        { color: colorValue, alignSelf: isCentered ? "center" : "auto" },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "small" ? styles.small : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 22,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 32,
  },

  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },

  small: {
    fontSize: 14,
    lineHeight: 20,
  },
});

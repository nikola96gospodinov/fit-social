import { useThemeColor } from "@/hooks/use-theme-color";
import { Text, type TextProps, StyleSheet } from "react-native";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "subtitle" | "small";
  color?: "default" | "supporting" | "error" | "tintText" | "defaultInverted";
  isCentered?: boolean;
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  color = "default",
  isCentered = false,
  ...rest
}: ThemedTextProps) {
  const defaultColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "text",
  );
  const tintTextColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "tintText",
  );
  const supportingColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "supportingText",
  );
  const errorColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "destructiveText",
  );
  const defaultInvertedColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "textInverted",
  );

  const colorValue = (() => {
    switch (color) {
      case "tintText":
        return tintTextColor;
      case "supporting":
        return supportingColor;
      case "defaultInverted":
        return defaultInvertedColor;
      case "error":
        return errorColor;
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

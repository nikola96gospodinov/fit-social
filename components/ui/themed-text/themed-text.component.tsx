import { useThemeColor } from "@/hooks/use-theme-color";
import { Text, type TextProps, StyleSheet } from "react-native";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?:
    | "default"
    | "title"
    | "defaultSemiBold"
    | "subtitle"
    | "link"
    | "small";
  color?: "default" | "supporting" | "error" | "tintText";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  color,
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

  const colorValue = (() => {
    switch (color) {
      case "default":
        return defaultColor;
      case "tintText":
        return tintTextColor;
      case "supporting":
        return supportingColor;
      case "error":
        return errorColor;
      default:
        return defaultColor;
    }
  })();

  return (
    <Text
      style={[
        { color: colorValue },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
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
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "600",
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

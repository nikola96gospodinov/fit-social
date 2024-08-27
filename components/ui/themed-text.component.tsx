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
  color?: "default" | "supporting";
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
    "text"
  );
  const supportingColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "supportingText"
  );

  return (
    <Text
      style={[
        { color: color === "supporting" ? supportingColor : defaultColor },
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

import { useThemeColor } from "@/hooks/use-theme-color";
import { View, StyleSheet } from "react-native";

type Props = {
  lightColor?: string;
  darkColor?: string;
  color?: "dark" | "light";
};

export const Divider = ({ color, lightColor, darkColor }: Props) => {
  const themeColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "text",
  );
  const dividerColor = color ?? themeColor;

  return (
    <View
      style={{
        height: StyleSheet.hairlineWidth,
        backgroundColor: dividerColor,
        flex: 1,
      }}
    />
  );
};

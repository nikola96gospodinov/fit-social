import { colors } from "@/constants/colors.constants";
import { useThemeColor } from "@/hooks/use-theme-color";
import { View, StyleSheet } from "react-native";

type Props = {
  lightColor?: string;
  darkColor?: string;
  color?: "dark" | "light";
};

export const Divider = ({ color, lightColor, darkColor }: Props) => {
  const dividerColor =
    color ?? useThemeColor({ light: lightColor, dark: darkColor }, "text");

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

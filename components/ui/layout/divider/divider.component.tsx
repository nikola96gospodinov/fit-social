import { colors } from "@/constants/colors.constants";
import { View, StyleSheet, useColorScheme } from "react-native";

export const Divider = () => {
  const theme = useColorScheme() ?? "light";

  return (
    <View
      style={[
        styles.divider,
        {
          backgroundColor: colors[theme].text,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  divider: {
    height: StyleSheet.hairlineWidth,
    flex: 1,
  },
});

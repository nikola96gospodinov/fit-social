import { slate } from "@/constants/colors.constants";
import { View, StyleSheet, useColorScheme } from "react-native";

export const Divider = () => {
  const theme = useColorScheme() ?? "light";

  return (
    <View
      style={[
        styles.divider,
        {
          backgroundColor: theme === "light" ? slate[800] : slate[200],
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

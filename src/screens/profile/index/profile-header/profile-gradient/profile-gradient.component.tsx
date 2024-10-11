import { slate } from "@/src/constants/colors.constants";
import { spacing } from "@/src/constants/spacing.constants";
import { LinearGradient } from "expo-linear-gradient";
import { useColorScheme, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const profileBackground = {
  light: [slate[300], slate[100]],
  dark: [slate[800], slate[900]],
};

export const ProfileGradient = () => {
  const theme = useColorScheme() ?? "light";
  const inset = useSafeAreaInsets();

  const extraSpacing = (() => {
    if (inset.top === 0) return spacing[12];
    if (inset.top < 32) return spacing[10];
    return spacing[8];
  })();

  return (
    <LinearGradient
      style={[styles.gradient, { paddingTop: inset.top + extraSpacing }]}
      colors={profileBackground[theme]}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
    />
  );
};

const styles = StyleSheet.create({
  gradient: {
    borderBottomRightRadius: 100,
  },
});

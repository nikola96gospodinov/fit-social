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

  return (
    <LinearGradient
      style={[styles.gradient, { paddingTop: inset.top + spacing[8] }]}
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

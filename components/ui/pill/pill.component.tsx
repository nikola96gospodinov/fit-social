import {
  Pressable,
  PressableProps,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { ThemedText } from "../themed-text/themed-text.component";
import { spacing } from "@/constants/spacing.constants";
import { colors } from "@/constants/colors.constants";

type Props = {
  label: string;
  isActive: boolean;
} & PressableProps;

export const Pill = ({ label, isActive, ...rest }: Props) => {
  const colorScheme = useColorScheme() ?? "light";

  const backgroundColor = isActive
    ? colors[colorScheme].tabIconSelected
    : colors[colorScheme].background;

  const textColor =
    colorScheme === "light" && isActive ? "tintText" : "default";

  return (
    <Pressable {...rest} style={[styles.pill, { backgroundColor }]}>
      <ThemedText type="small" color={textColor}>
        {label}
      </ThemedText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pill: {
    alignSelf: "flex-start",
    borderRadius: 20,
    paddingVertical: spacing[1],
    paddingHorizontal: spacing[3],
  },
});

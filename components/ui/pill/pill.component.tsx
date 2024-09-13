import {
  Pressable,
  PressableProps,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { ThemedText } from "../themed-text/themed-text.component";
import { spacing } from "@/constants/spacing.constants";
import { colors } from "@/constants/colors.constants";
import Ionicons from "@expo/vector-icons/Ionicons";

type Props = {
  label: string;
  isActive: boolean;
  onDelete?: () => void;
} & PressableProps;

export const Pill = ({
  label,
  isActive,
  onDelete,
  onPress,
  ...rest
}: Props) => {
  const colorScheme = useColorScheme() ?? "light";

  const backgroundColor = isActive
    ? colors[colorScheme].tabIconSelected
    : colors[colorScheme].background;

  const textColor =
    colorScheme === "light" && isActive ? "tintText" : "default";

  return (
    <Pressable
      {...rest}
      style={[styles.pill, { backgroundColor }]}
      onPress={(e) => {
        onPress?.(e);
        onDelete?.();
      }}>
      <ThemedText type="small" color={textColor}>
        {label}
      </ThemedText>

      {onDelete && (
        <Pressable>
          <Ionicons
            name="close-circle"
            size={12}
            color={colors[colorScheme].supportingText}
            style={{ marginTop: 1 }}
          />
        </Pressable>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pill: {
    alignSelf: "flex-start",
    borderRadius: 20,
    paddingVertical: spacing[0.5],
    paddingHorizontal: spacing[3],
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});

import {
  Pressable,
  PressableProps,
  StyleSheet,
  useColorScheme,
  View,
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
    ? colors[colorScheme].tintBackground
    : colors[colorScheme].sectionBackground;

  const textColor =
    colorScheme === "light" && isActive ? "tintBackgroundText" : "default";

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
        <View>
          <Ionicons
            name="close-circle"
            size={12}
            color={colors[colorScheme].icon}
            style={{ marginTop: 1 }}
          />
        </View>
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

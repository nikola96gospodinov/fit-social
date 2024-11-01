import { colors } from "@/src/constants/colors.constants";
import { View, StyleSheet, useColorScheme, Pressable } from "react-native";
import { ThemedText } from "../../themed-text/themed-text.component";
import { spacing } from "@/src/constants/spacing.constants";

type Props = {
  isSelected: boolean;
  onPress?: () => void;
  label?: string;
};

export const ThemedRadio = ({ isSelected, label, onPress }: Props) => {
  const theme = useColorScheme() ?? "light";

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View
        style={[
          styles.radioOuter,
          {
            borderColor: isSelected
              ? colors[theme].borderFocused
              : colors[theme].border,
          },
        ]}>
        {isSelected && (
          <View
            style={[
              styles.radioInner,
              { backgroundColor: colors[theme].borderFocused },
            ]}
          />
        )}
      </View>

      {label && <ThemedText type="small">{label}</ThemedText>}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 100,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },

  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 100,
  },

  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
  },
});

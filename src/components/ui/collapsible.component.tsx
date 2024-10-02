import Ionicons from "@expo/vector-icons/Ionicons";
import { PropsWithChildren, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { colors } from "@/src/constants/colors.constants";

export function Collapsible({
  children,
  title,
}: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useColorScheme() ?? "light";

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors[theme].sectionBackground,
          borderColor: colors[theme].border,
        },
      ]}>
      <TouchableOpacity
        style={styles.heading}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}>
        <Ionicons
          name={isOpen ? "chevron-down" : "chevron-forward-outline"}
          size={18}
          color={colors[theme].icon}
        />
        <ThemedText style={{ fontWeight: "bold" }}>{title}</ThemedText>
      </TouchableOpacity>
      {isOpen && <View style={styles.content}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: 8,
    borderWidth: StyleSheet.hairlineWidth,
  },

  heading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  content: {
    marginTop: 6,
    marginLeft: 24,
    paddingBottom: 12,
    marginRight: 12,
  },
});

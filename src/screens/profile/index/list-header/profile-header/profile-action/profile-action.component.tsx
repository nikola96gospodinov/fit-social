import { useColorScheme, StyleSheet, Pressable } from "react-native";
import { colors } from "@/src/constants/colors.constants";
import { spacing } from "@/src/constants/spacing.constants";
import { FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";

export const ProfileAction = () => {
  const theme = useColorScheme() ?? "light";

  return (
    <Pressable onPress={() => router.push("/profile/edit")}>
      <FontAwesome6
        name="user-gear"
        size={20}
        color={colors[theme].icon}
        style={styles.editProfileIcon}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  editProfileIcon: {
    marginTop: -spacing[6],
    marginRight: -spacing[1],
  },
});

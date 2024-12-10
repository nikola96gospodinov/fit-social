import { useColorScheme, View, StyleSheet, Pressable } from "react-native";
import { colors } from "@/src/constants/colors.constants";
import { spacing } from "@/src/constants/spacing.constants";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router } from "expo-router";
import { Avatar } from "@/src/components/avatar/avatar.component";

export const ProfilePic = () => {
  const theme = useColorScheme() ?? "light";

  return (
    <View
      style={[
        styles.avatar,
        {
          borderColor: colors[theme].background,
          backgroundColor: colors[theme].background,
        },
      ]}>
      <Avatar size={60} />

      <Pressable
        style={[
          styles.avatarIcon,
          {
            backgroundColor: colors[theme].background,
            borderColor: colors[theme].border,
          },
        ]}
        onPress={() => router.push("/profile/edit")}>
        <FontAwesome name="gear" size={14} color={colors[theme].textIcon} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 68,
    height: 68,
    borderRadius: 50,
    borderWidth: 4,
    marginTop: -spacing[8],
    alignItems: "center",
    justifyContent: "center",
  },

  avatarIcon: {
    position: "absolute",
    bottom: -spacing[1],
    right: -spacing[1],
    padding: spacing[1] + spacing[0.5],
    borderRadius: 100,
    borderWidth: 1,
  },
});

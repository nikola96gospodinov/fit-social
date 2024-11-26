import { useColorScheme, View, StyleSheet, Pressable } from "react-native";
import { colors } from "@/src/constants/colors.constants";
import { spacing } from "@/src/constants/spacing.constants";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { router } from "expo-router";
import { useIsOwnProfile } from "@/src/hooks/use-is-own-profile";
import { Avatar } from "@/src/components/avatar/avater.component";

export const ProfilePic = () => {
  const theme = useColorScheme() ?? "light";

  const isYourProfile = useIsOwnProfile();

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

      {isYourProfile && (
        <Pressable
          style={[
            styles.avatarIcon,
            {
              backgroundColor: colors[theme].background,
              borderColor: colors[theme].border,
            },
          ]}
          onPress={() => router.push("/profile/edit")}>
          <FontAwesome6 name="pencil" size={12} color={colors[theme].icon} />
        </Pressable>
      )}
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
    bottom: 0,
    right: 0,
    padding: spacing[1],
    borderRadius: 100,
    borderWidth: 1,
  },
});

import { useColorScheme, StyleSheet, Pressable } from "react-native";
import { FollowButton } from "./follow-button/follow-button.component";
import { colors } from "@/src/constants/colors.constants";
import { spacing } from "@/src/constants/spacing.constants";
import { FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";
import { useIsOwnProfile } from "@/src/hooks/use-is-own-profile";

export const ProfileAction = () => {
  const theme = useColorScheme() ?? "light";

  const isYourProfile = useIsOwnProfile();

  return (
    <>
      {isYourProfile ? (
        <Pressable onPress={() => router.push("/profile/edit")}>
          <FontAwesome6
            name="user-gear"
            size={20}
            color={colors[theme].icon}
            style={styles.editProfileIcon}
          />
        </Pressable>
      ) : (
        <FollowButton />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  editProfileIcon: {
    marginTop: -spacing[6],
    marginRight: -spacing[1],
  },
});

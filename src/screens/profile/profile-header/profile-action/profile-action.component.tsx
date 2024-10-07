import { useColorScheme, StyleSheet } from "react-native";
import { FollowButton } from "./follow-button/follow-button.component";
import { colors } from "@/src/constants/colors.constants";
import { spacing } from "@/src/constants/spacing.constants";
import { FontAwesome6 } from "@expo/vector-icons";

export const ProfileAction = () => {
  const theme = useColorScheme() ?? "light";

  // TODO: Determine later
  const isYourProfile = true;

  return (
    <>
      {isYourProfile ? (
        <FontAwesome6
          name="user-gear"
          size={20}
          color={colors[theme].icon}
          style={styles.editProfileIcon}
        />
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

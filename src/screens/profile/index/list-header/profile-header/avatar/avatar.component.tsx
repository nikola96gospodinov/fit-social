import { useColorScheme, View, StyleSheet, Pressable } from "react-native";
import { Image } from "expo-image";
import { colors } from "@/src/constants/colors.constants";
import { spacing } from "@/src/constants/spacing.constants";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { router } from "expo-router";
import { useIsOwnProfile } from "@/src/hooks/use-is-own-profile";
import { useGetProfilePic } from "@/src/services/profile/get-profile-pic.service";

export const Avatar = () => {
  const theme = useColorScheme() ?? "light";

  const isYourProfile = useIsOwnProfile();
  const { data: profilePic } = useGetProfilePic();

  console.log(profilePic);

  return (
    <View
      style={[
        styles.avatar,
        {
          borderColor: colors[theme].background,
          backgroundColor: colors[theme].background,
        },
      ]}>
      {profilePic ? (
        <Image
          source={{
            uri: profilePic,
          }}
          style={styles.image}
        />
      ) : (
        <FontAwesome name="user-circle" size={60} color={colors[theme].icon} />
      )}

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

  image: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
});

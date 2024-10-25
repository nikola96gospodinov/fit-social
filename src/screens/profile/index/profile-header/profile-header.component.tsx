import { View, StyleSheet, useColorScheme } from "react-native";
import { spacing } from "@/src/constants/spacing.constants";
import { Flex } from "@/src/components/ui/layout/flex/flex.component";
import { Avatar } from "./avatar/avatar.component";
import { useGetProfile } from "@/src/services/profile/get-profile.service";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { ProfileGradient } from "./profile-gradient/profile-gradient.component";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ProfileAction } from "./profile-action/profile-action.component";
import { Bio } from "./bio/bio.component";
import { colors } from "@/src/constants/colors.constants";
import { Ionicons } from "@expo/vector-icons";

export const ProfileHeader = () => {
  const { data: profile } = useGetProfile();
  const theme = useColorScheme() ?? "light";

  if (!profile) return null;

  const showBio = profile.bio || profile.full_name;

  const showHomeGym = profile.home_gym_name;

  return (
    <View>
      <ProfileGradient />

      <View style={styles.container}>
        <Flex direction="row" justify="space-between" align="center">
          <Flex direction="row" gap={2} align="center">
            <Avatar avatarUrl={profile.avatar_url} />
            <ThemedText type="small" color="default">
              @{profile.handle}
            </ThemedText>
          </Flex>

          <ProfileAction />
        </Flex>

        {showHomeGym && (
          <>
            <VerticalSpacing size={2} />

            <Flex
              direction="row"
              gap={1}
              align="center"
              style={styles.homeGymContainer}>
              <Ionicons
                name="location-sharp"
                size={14}
                color={colors[theme].activeIcon}
              />

              <ThemedText type="extraSmall" color="supporting">
                {profile.home_gym_name}
              </ThemedText>
            </Flex>
          </>
        )}

        {showBio && (
          <>
            <VerticalSpacing size={2} />

            <Bio />
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing[4],
  },

  userInfo: {
    marginTop: spacing[2],
  },

  homeGymContainer: {
    transform: [{ translateX: -4 }],
  },
});

import { View, StyleSheet } from "react-native";
import { spacing } from "@/src/constants/spacing.constants";
import { Flex } from "@/src/components/ui/layout/flex/flex.component";
import { ProfilePic } from "./profile-pic/profile-pic.component";
import { useGetProfile } from "@/src/services/profile/get-profile.service";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { ProfileGradient } from "./profile-gradient/profile-gradient.component";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ProfileAction } from "./profile-action/profile-action.component";
import { Bio } from "../../../../../features/profile/bio/bio.component";
import { HomeGym } from "../../../../../features/profile/home-gym/home-gym.component";

export const ProfileHeader = () => {
  const { data: profile } = useGetProfile();

  if (!profile) return null;

  const showBio = profile.bio || profile.full_name;

  const showHomeGym = profile.home_gym_name;

  return (
    <View>
      <ProfileGradient />

      <View style={styles.container}>
        <Flex direction="row" justify="space-between" align="center">
          <Flex direction="row" gap={2} align="center">
            <ProfilePic />

            <ThemedText type="small" color="default">
              @{profile.handle}
            </ThemedText>
          </Flex>

          <ProfileAction />
        </Flex>

        {showHomeGym && <HomeGym homeGymName={profile.home_gym_name!} />}

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

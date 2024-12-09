import { Avatar } from "@/src/components/avatar/avatar.component";
import { Flex } from "@/src/components/ui/layout/flex/flex.component";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { spacing } from "@/src/constants/spacing.constants";
import { FollowButton } from "@/src/features/follows/follow-button/follow-button.component";
import { View, StyleSheet } from "react-native";
import { Bio } from "../../bio/bio.component";
import { HomeGym } from "../../home-gym/home-gym.component";
import { Stats } from "../../stats/stats.component";
import { useLocalSearchParams } from "expo-router";
import { useGetProfile } from "@/src/services/profile/get-profile.service";

export const OtherProfileListHeader = () => {
  const { id } = useLocalSearchParams();

  const { data: profile } = useGetProfile(id as string);

  if (!profile) return null;

  const showBio = profile.bio || profile.full_name;

  const showHomeGym = profile.home_gym_name;

  return (
    <View style={styles.container}>
      <Flex gap={6} align="flex-end" direction="row">
        <Avatar size={80} userId={profile?.id} />

        <Flex style={{ flex: 1 }} align="center">
          <Stats userId={profile.id} />

          <VerticalSpacing size={3} />

          <FollowButton profileToFollow={profile} size="xs" isFullWidth />
        </Flex>
      </Flex>

      {showHomeGym && (
        <>
          <VerticalSpacing size={4} />

          <HomeGym homeGymName={profile.home_gym_name!} />
        </>
      )}

      {showBio && (
        <>
          <VerticalSpacing size={showHomeGym ? 2 : 4} />

          <Bio userId={profile.id} />
        </>
      )}

      <VerticalSpacing size={8} />

      <ThemedText type="subtitle">Past Workouts</ThemedText>

      <VerticalSpacing size={2} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing[4],
  },
});

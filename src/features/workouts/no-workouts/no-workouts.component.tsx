import { Flex } from "@/src/components/ui/layout/flex/flex.component";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ThemedActivityIndicator } from "@/src/components/ui/themed-activity-indicator/themed-activity-indicator.component";
import { ThemedButton } from "@/src/components/ui/themed-button/themed-button.component";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { spacing } from "@/src/constants/spacing.constants";
import { useGetSession } from "@/src/services/auth/get-session.service";
import { useActiveWorkoutStore } from "@/src/store/active-workout-store";
import { router, useLocalSearchParams } from "expo-router";
import { View, StyleSheet } from "react-native";
import { useIsProfileRestricted } from "../../profile/other-profile/use-is-profile-restricted";
import { LockedProfile } from "../../profile/other-profile/locked-profile/locked-profile.component";

type Props = {
  isLoading?: boolean;
};

export const NoWorkouts = ({ isLoading }: Props) => {
  const { id } = useLocalSearchParams();

  const { data: session } = useGetSession();

  const isProfileRestricted = useIsProfileRestricted(id as string);

  const isYourProfile = session?.user.id === id || !id;

  const {
    store: { startWorkout },
  } = useActiveWorkoutStore();

  const handleStartWorkout = () => {
    startWorkout();
    router.push("/workout");
  };

  if (isLoading) return <ThemedActivityIndicator />;

  if (isProfileRestricted) return <LockedProfile />;

  return (
    <Flex
      direction="column"
      align={isYourProfile ? "center" : "flex-start"}
      style={styles.container}>
      {isYourProfile && <VerticalSpacing size={8} />}

      <ThemedText color="supporting">No workouts added yet</ThemedText>

      {isYourProfile && (
        <View style={styles.buttonContainer}>
          <VerticalSpacing size={3} />

          <ThemedButton
            text="Start a workout"
            size="sm"
            onPress={handleStartWorkout}
          />
        </View>
      )}
    </Flex>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing[4],
    flexShrink: 1,
  },

  buttonContainer: {
    flexShrink: 1,
  },
});

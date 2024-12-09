import { Flex } from "@/src/components/ui/layout/flex/flex.component";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ThemedButton } from "@/src/components/ui/themed-button/themed-button.component";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { spacing } from "@/src/constants/spacing.constants";
import { useGetSession } from "@/src/services/auth/get-session.service";
import { useActiveWorkoutStore } from "@/src/store/active-workout-store";
import { router, useLocalSearchParams } from "expo-router";
import { View, StyleSheet } from "react-native";

export const NoWorkouts = () => {
  const { id } = useLocalSearchParams();

  const { data: session } = useGetSession();

  const isYourProfile = session?.user.id === id;

  const {
    store: { startWorkout },
  } = useActiveWorkoutStore();

  const handleStartWorkout = () => {
    startWorkout();
    router.push("/workout");
  };

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

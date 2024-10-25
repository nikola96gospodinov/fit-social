import { ThemedActivityIndicator } from "@/src/components/ui/themed-activity-indicator/themed-activity-indicator.component";
import { useGetProfile } from "@/src/services/profile/get-profile.service";
import { useGetWorkouts } from "@/src/services/workout/get-workouts.service";
import { PastWorkoutBox } from "./past-workout-box/past-workout-box.component";
import { FlashList } from "@shopify/flash-list";
import { View, StyleSheet } from "react-native";
import { spacing } from "@/src/constants/spacing.constants";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";

export const PastWorkouts = () => {
  const { data: profile, isLoading: profileLoading } = useGetProfile();
  const { data: workouts, isLoading: workoutsLoading } = useGetWorkouts({
    handle: profile?.handle,
  });

  if (profileLoading || workoutsLoading || !workouts?.data)
    return <ThemedActivityIndicator padding={2} />;

  return (
    <View style={styles.container}>
      <ThemedText type="subtitle">Past Workouts</ThemedText>

      <VerticalSpacing size={4} />

      <FlashList
        data={workouts.data}
        renderItem={({ item }) => {
          return <PastWorkoutBox workout={item} />;
        }}
        keyExtractor={(item) => item.id}
        estimatedItemSize={workouts?.count ?? 100}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing[4],
    flex: 1,
    minHeight: 350, // This is needed for the flash list to render
  },
});

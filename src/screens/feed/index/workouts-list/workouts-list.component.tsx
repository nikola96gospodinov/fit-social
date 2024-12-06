import { useGetWorkoutsForFeed } from "@/src/services/workout/get-workouts-for-feed.service";
import { FlashList } from "@shopify/flash-list";
import { EmptyList } from "./empty-list/empty-list.component";
import { PastWorkoutBox } from "@/src/features/workouts/past-workout/past-workout-box/past-workout-box.component";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { spacing } from "@/src/constants/spacing.constants";
import { StyleSheet } from "react-native";

export const WorkoutsList = () => {
  const { data: workouts, isLoading: workoutsLoading } =
    useGetWorkoutsForFeed();

  return (
    <FlashList
      data={workouts}
      renderItem={({ item }) => <PastWorkoutBox workout={item} />}
      estimatedItemSize={100}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={<EmptyList isLoading={workoutsLoading} />}
      ItemSeparatorComponent={() => <VerticalSpacing size={8} />}
      ListHeaderComponent={() => <VerticalSpacing size={4} />}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: spacing[8],
  },
});

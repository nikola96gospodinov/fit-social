import { useGetInfiniteWorkoutsForFeed } from "@/src/services/workout/get-workouts-for-feed.service";
import { FlashList } from "@shopify/flash-list";
import { EmptyList } from "./empty-list/empty-list.component";
import { PastWorkoutBox } from "@/src/features/workouts/past-workout/past-workout-box/past-workout-box.component";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { spacing } from "@/src/constants/spacing.constants";
import { StyleSheet } from "react-native";
import { InfiniteScrollFooter } from "@/src/components/infinite-scroll-footer/infinite-scroll-footer.component";

export const WorkoutsList = () => {
  const {
    data: workouts,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoadingError,
    refetch,
    isFetchNextPageError,
    isLoading,
  } = useGetInfiniteWorkoutsForFeed();

  const allWorkouts = workouts?.pages.flatMap((page) => page.workouts) || [];

  return (
    <FlashList
      data={allWorkouts}
      onEndReached={() => hasNextPage && fetchNextPage()}
      renderItem={({ item }) => <PastWorkoutBox workout={item} />}
      estimatedItemSize={100}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={
        <EmptyList
          isLoading={isLoading}
          isLoadingError={isLoadingError}
          refetch={refetch}
        />
      }
      ItemSeparatorComponent={() => <VerticalSpacing size={8} />}
      ListHeaderComponent={() => <VerticalSpacing size={4} />}
      contentContainerStyle={styles.container}
      ListFooterComponent={() => (
        <InfiniteScrollFooter
          isFetchNextPageError={isFetchNextPageError}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
          message="Failed to fetch more updates"
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: spacing[4],
  },
});

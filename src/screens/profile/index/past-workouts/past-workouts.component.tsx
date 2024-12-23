import { ThemedActivityIndicator } from "@/src/components/ui/themed-activity-indicator/themed-activity-indicator.component";
import { useGetProfile } from "@/src/services/profile/get-profile.service";
import { useGetInfiniteWorkouts } from "@/src/services/workout/get-workouts.service";
import { PastWorkoutBox } from "../../../../features/workouts/past-workout/past-workout-box/past-workout-box.component";
import { FlashList } from "@shopify/flash-list";
import { View, StyleSheet, Dimensions } from "react-native";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ListHeader } from "../list-header/list-header.component";
import { FullScreenCenteredView } from "@/src/components/ui/layout/full-screen-centered-view/full-screen-centered-view.component";
import { NoWorkouts } from "../../../../features/workouts/no-workouts/no-workouts.component";
import { useMemo } from "react";
import { groupWorkoutsByYearAndMonth } from "@/src/features/workouts/utils/group-workouts-by-year-and-month.utils";
import { WorkoutPeriodLabel } from "@/src/features/workouts/workout-period-label/workout-period-label.component";
import { InfiniteScrollFooter } from "@/src/components/infinite-scroll-footer/infinite-scroll-footer.component";
import { spacing } from "@/src/constants/spacing.constants";

export const PastWorkouts = () => {
  const { data: profile, isLoading: profileLoading } = useGetProfile();
  const {
    data: workouts,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoadingError,
    refetch,
    isFetchNextPageError,
    isLoading: isWorkoutsLoading,
  } = useGetInfiniteWorkouts({
    userId: profile?.id,
  });

  const items = useMemo(() => {
    const allWorkouts = workouts?.pages.flatMap((page) => page.workouts) || [];
    return groupWorkoutsByYearAndMonth(allWorkouts);
  }, [workouts?.pages]);

  if (profileLoading || isWorkoutsLoading || !workouts?.pages)
    return (
      <FullScreenCenteredView>
        <ThemedActivityIndicator />
      </FullScreenCenteredView>
    );

  return (
    <View style={styles.container}>
      <FlashList
        data={items}
        onEndReached={() => hasNextPage && fetchNextPage()}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => {
          if (typeof item === "string")
            return <WorkoutPeriodLabel period={item} />;

          return <PastWorkoutBox workout={item} />;
        }}
        estimatedItemSize={100}
        ItemSeparatorComponent={({ item }) => {
          if (typeof item === "string") return null;
          return <VerticalSpacing size={8} />;
        }}
        ListFooterComponent={() => (
          <InfiniteScrollFooter
            isFetchNextPageError={isFetchNextPageError}
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
            message="Failed to fetch more workouts"
          />
        )}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={() => (
          <NoWorkouts
            isLoading={isWorkoutsLoading}
            isLoadingError={isLoadingError}
            refetch={refetch}
          />
        )}
        getItemType={(item) => {
          return typeof item === "string" ? "sectionHeader" : "row";
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: Dimensions.get("window").height,
    paddingBottom: spacing[13],
  },
});

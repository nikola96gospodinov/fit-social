import { useGetProfile } from "@/src/services/profile/get-profile.service";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useMemo } from "react";
import { ThemedActivityIndicator } from "@/src/components/ui/themed-activity-indicator/themed-activity-indicator.component";
import { FlashList } from "@shopify/flash-list";
import { PastWorkoutBox } from "../../workouts/past-workout/past-workout-box/past-workout-box.component";
import { OtherProfileListHeader } from "./list-header/other-profile-list-header.component";
import { useGetInfiniteWorkouts } from "@/src/services/workout/get-workouts.service";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { NoWorkouts } from "../../workouts/no-workouts/no-workouts.component";
import { groupWorkoutsByYearAndMonth } from "../../workouts/utils/group-workouts-by-year-and-month.utils";
import { WorkoutPeriodLabel } from "../../workouts/workout-period-label/workout-period-label.component";
import { InfiniteScrollFooter } from "@/src/components/infinite-scroll-footer/infinite-scroll-footer.component";

export const OtherProfileContent = () => {
  const { id } = useLocalSearchParams();

  const { data: profile, isLoading } = useGetProfile(id as string);

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
    userId: id as string,
  });

  const items = useMemo(() => {
    const allWorkouts = workouts?.pages.flatMap((page) => page.workouts) || [];
    return groupWorkoutsByYearAndMonth(allWorkouts);
  }, [workouts?.pages]);

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: `@${profile?.handle}`,
    });
  }, [profile?.handle, navigation]);

  if (isLoading || !profile) return <ThemedActivityIndicator />;

  return (
    <FlashList
      data={items}
      onEndReached={() => hasNextPage && fetchNextPage()}
      renderItem={({ item }) => {
        if (typeof item === "string")
          return <WorkoutPeriodLabel period={item} />;
        return <PastWorkoutBox workout={item} />;
      }}
      estimatedItemSize={workouts?.pages[0].count || 100}
      ItemSeparatorComponent={({ item }) => {
        if (typeof item === "string") return null;
        return <VerticalSpacing size={8} />;
      }}
      ListHeaderComponent={OtherProfileListHeader}
      ListFooterComponent={() => (
        <InfiniteScrollFooter
          isFetchNextPageError={isFetchNextPageError}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
          message="Failed to fetch more workouts"
        />
      )}
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
  );
};

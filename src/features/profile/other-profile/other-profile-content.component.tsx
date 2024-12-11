import { useGetProfile } from "@/src/services/profile/get-profile.service";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useMemo } from "react";
import { ThemedActivityIndicator } from "@/src/components/ui/themed-activity-indicator/themed-activity-indicator.component";
import { FlashList } from "@shopify/flash-list";
import { PastWorkoutBox } from "../../workouts/past-workout/past-workout-box/past-workout-box.component";
import { OtherProfileListHeader } from "./list-header/other-profile-list-header.component";
import { useGetWorkouts } from "@/src/services/workout/get-workouts.service";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { NoWorkouts } from "../../workouts/no-workouts/no-workouts.component";
import { groupWorkoutsByYearAndMonth } from "../../workouts/utils/group-workouts-by-year-and-month.utils";
import { WorkoutPeriodLabel } from "../../workouts/workout-period-label/workout-period-label.component";

export const OtherProfileContent = () => {
  const { id } = useLocalSearchParams();

  const { data: profile, isLoading } = useGetProfile(id as string);

  const { data: workouts, isLoading: isWorkoutsLoading } = useGetWorkouts({
    userId: id as string,
  });

  const items = useMemo(() => {
    return groupWorkoutsByYearAndMonth(workouts?.data);
  }, [workouts?.data]);

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
      renderItem={({ item }) => {
        if (typeof item === "string")
          return <WorkoutPeriodLabel period={item} />;
        return <PastWorkoutBox workout={item} />;
      }}
      estimatedItemSize={workouts?.count || 100}
      ItemSeparatorComponent={({ item }) => {
        if (typeof item === "string") return null;
        return <VerticalSpacing size={8} />;
      }}
      ListHeaderComponent={OtherProfileListHeader}
      ListFooterComponent={() => <VerticalSpacing size={4} />}
      ListEmptyComponent={() => <NoWorkouts isLoading={isWorkoutsLoading} />}
      getItemType={(item) => {
        return typeof item === "string" ? "sectionHeader" : "row";
      }}
    />
  );
};

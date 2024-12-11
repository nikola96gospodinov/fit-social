import { ThemedActivityIndicator } from "@/src/components/ui/themed-activity-indicator/themed-activity-indicator.component";
import { useGetProfile } from "@/src/services/profile/get-profile.service";
import { useGetWorkouts } from "@/src/services/workout/get-workouts.service";
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

export const PastWorkouts = () => {
  const { data: profile, isLoading: profileLoading } = useGetProfile();
  const { data: workouts, isLoading: workoutsLoading } = useGetWorkouts({
    userId: profile?.id,
  });

  const items = useMemo(() => {
    return groupWorkoutsByYearAndMonth(workouts?.data);
  }, [workouts?.data]);

  if (profileLoading || workoutsLoading || !workouts?.data)
    return (
      <FullScreenCenteredView>
        <ThemedActivityIndicator />
      </FullScreenCenteredView>
    );

  return (
    <View style={styles.container}>
      <FlashList
        data={items}
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
        ListFooterComponent={() => <VerticalSpacing size={13} />}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={NoWorkouts}
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
  },
});

import { ThemedActivityIndicator } from "@/src/components/ui/themed-activity-indicator/themed-activity-indicator.component";
import { useGetProfile } from "@/src/services/profile/get-profile.service";
import { useGetWorkouts } from "@/src/services/workout/get-workouts.service";
import { PastWorkoutBox } from "../../../../features/workouts/past-workout/past-workout-box/past-workout-box.component";
import { FlashList } from "@shopify/flash-list";
import { View, StyleSheet, Dimensions } from "react-native";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ListHeader } from "../list-header/list-header.component";
import { FullScreenCenteredView } from "@/src/components/ui/layout/full-screen-centered-view/full-screen-centered-view.component";
import { NoWorkouts } from "./no-workouts/no-workouts.component";

export const PastWorkouts = () => {
  const { data: profile, isLoading: profileLoading } = useGetProfile();
  const { data: workouts, isLoading: workoutsLoading } = useGetWorkouts({
    userId: profile?.id,
  });

  if (profileLoading || workoutsLoading || !workouts?.data)
    return (
      <FullScreenCenteredView>
        <ThemedActivityIndicator />
      </FullScreenCenteredView>
    );

  return (
    <View style={styles.container}>
      <FlashList
        data={workouts.data}
        renderItem={({ item }) => {
          return <PastWorkoutBox workout={item} />;
        }}
        keyExtractor={(item) => item.id}
        estimatedItemSize={workouts?.count || 100}
        ItemSeparatorComponent={() => <VerticalSpacing size={8} />}
        ListFooterComponent={() => <VerticalSpacing size={13} />}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={NoWorkouts}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: Dimensions.get("window").height,
  },
});

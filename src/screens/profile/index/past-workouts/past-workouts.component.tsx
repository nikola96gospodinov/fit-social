import { ThemedActivityIndicator } from "@/src/components/ui/themed-activity-indicator/themed-activity-indicator.component";
import { useGetProfile } from "@/src/services/profile/get-profile.service";
import { useGetWorkouts } from "@/src/services/workout/get-workouts.service";
import { PastWorkoutBox } from "./past-workout-box/past-workout-box.component";
import { FlashList } from "@shopify/flash-list";
import { View, StyleSheet, Dimensions } from "react-native";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ListHeader } from "../list-header/list-header.component";

export const PastWorkouts = () => {
  const { data: profile, isLoading: profileLoading } = useGetProfile();
  const { data: workouts, isLoading: workoutsLoading } = useGetWorkouts({
    handle: profile?.handle,
  });

  if (profileLoading || workoutsLoading || !workouts?.data)
    return <ThemedActivityIndicator padding={2} />;

  return (
    <View style={styles.container}>
      <FlashList
        data={workouts.data}
        renderItem={({ item }) => {
          return <PastWorkoutBox workout={item} />;
        }}
        keyExtractor={(item) => item.id}
        estimatedItemSize={workouts?.count || 100}
        ItemSeparatorComponent={() => <VerticalSpacing size={4} />}
        ListFooterComponent={() => <VerticalSpacing size={13} />}
        ListHeaderComponent={ListHeader}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: Dimensions.get("window").height,
  },
});

import { ThemedActivityIndicator } from "@/src/components/ui/themed-activity-indicator/themed-activity-indicator.component";
import { useGetProfile } from "@/src/services/profile/get-profile.service";
import { useGetWorkouts } from "@/src/services/workout/get-workouts.service";
import { FlatList } from "react-native";
import { PastWorkoutBox } from "./past-workout-box/past-workout-box.component";

export const PastWorkouts = () => {
  const { data: profile, isLoading: profileLoading } = useGetProfile();
  const { data: workouts, isLoading: workoutsLoading } = useGetWorkouts({
    handle: profile?.handle,
  });

  if (profileLoading || workoutsLoading)
    return <ThemedActivityIndicator padding={2} />;

  return (
    <FlatList
      data={workouts}
      renderItem={({ item }) => {
        return <PastWorkoutBox workout={item} />;
      }}
      keyExtractor={(item) => item.id}
    />
  );
};

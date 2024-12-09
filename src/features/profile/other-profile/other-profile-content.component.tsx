import { useGetProfile } from "@/src/services/profile/get-profile.service";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { ThemedActivityIndicator } from "@/src/components/ui/themed-activity-indicator/themed-activity-indicator.component";
import { FlashList } from "@shopify/flash-list";
import { PastWorkoutBox } from "../../workouts/past-workout/past-workout-box/past-workout-box.component";
import { OtherProfileListHeader } from "./list-header/other-profile-list-header.component";
import { useGetWorkouts } from "@/src/services/workout/get-workouts.service";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { NoWorkouts } from "../../workouts/no-workouts/no-workouts.component";

export const OtherProfileContent = () => {
  const { id } = useLocalSearchParams();

  const { data: profile, isLoading } = useGetProfile(id as string);

  const { data: workouts, isLoading: isWorkoutsLoading } = useGetWorkouts({
    userId: id as string,
  });

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: `@${profile?.handle}`,
    });
  }, [profile?.handle, navigation]);

  if (isLoading || !profile) return <ThemedActivityIndicator />;

  return (
    <FlashList
      data={workouts?.data}
      renderItem={({ item }) => <PastWorkoutBox workout={item} />}
      estimatedItemSize={workouts?.count || 100}
      ItemSeparatorComponent={() => <VerticalSpacing size={8} />}
      ListHeaderComponent={OtherProfileListHeader}
      ListFooterComponent={() => <VerticalSpacing size={4} />}
      ListEmptyComponent={() => <NoWorkouts isLoading={isWorkoutsLoading} />}
    />
  );
};

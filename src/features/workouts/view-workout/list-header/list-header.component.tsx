import { useGetProfile } from "@/src/services/profile/get-profile.service";
import { Pressable, View } from "react-native";
import { Flex } from "@/src/components/ui/layout/flex/flex.component";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { getWorkoutDistance } from "../../../../features/workouts/past-workout/past-workout-box/past-workout-box.utils";
import { Href, router, useLocalSearchParams, useSegments } from "expo-router";
import { useGetWorkoutById } from "@/src/services/workout/get-workout-by-id.service";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { WorkoutStats } from "@/src/features/workouts/past-workout/workout-stats/workout-stats.component";
import { Avatar } from "@/src/components/avatar/avatar.component";

export const ViewWorkoutListHeader = () => {
  const { id } = useLocalSearchParams();

  const { data: workout } = useGetWorkoutById(id as string);

  const { data: profile } = useGetProfile(workout?.user_id);

  const segments = useSegments();
  const tab = segments[1] || "(index)";

  if (!workout) return null;

  const distance = getWorkoutDistance(workout.started, workout.ended);

  return (
    <>
      <Pressable
        onPress={() => {
          if (id !== profile?.id) {
            router.back();
            router.push(`/${tab}/other-profile/${profile?.id}` as Href);
          }
        }}>
        <Flex direction="row" align="center" gap={3}>
          <View>
            <Avatar size={36} userId={profile?.id} />
          </View>

          <View>
            <ThemedText type="small">@{profile?.handle}</ThemedText>

            <ThemedText type="extraSmall" color="supporting">
              {distance}
            </ThemedText>
          </View>
        </Flex>
      </Pressable>

      <VerticalSpacing size={3} />

      <WorkoutStats workout={workout} />

      <VerticalSpacing size={6} />
    </>
  );
};

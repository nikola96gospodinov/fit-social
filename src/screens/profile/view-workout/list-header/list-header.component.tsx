import { useGetProfile } from "@/src/services/profile/get-profile.service";
import { View } from "react-native";
import { Flex } from "@/src/components/ui/layout/flex/flex.component";
import { colors } from "@/src/constants/colors.constants";
import { useColorScheme, StyleSheet } from "react-native";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { getWorkoutDistance } from "../../../../features/workouts/past-workout/past-workout-box/past-workout-box.utils";
import { useLocalSearchParams } from "expo-router";
import { useGetWorkoutById } from "@/src/services/workout/get-workout-by-id.service";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { WorkoutStats } from "@/src/features/workouts/past-workout/workout-stats/workout-stats.component";
import { Avatar } from "@/src/components/avatar/avater.component";

export const ViewWorkoutListHeader = () => {
  const theme = useColorScheme() ?? "light";

  const { data: profile } = useGetProfile();

  const { id } = useLocalSearchParams();

  const { data: workout } = useGetWorkoutById(id as string);

  if (!workout) return null;

  const distance = getWorkoutDistance(workout.started, workout.ended);

  return (
    <>
      <Flex
        direction="row"
        align="center"
        gap={3}
        style={[
          styles.userInfoContainer,
          {
            backgroundColor: colors[theme].background,
          },
        ]}>
        <View>
          <Avatar size={36} />
        </View>

        <View>
          <ThemedText type="small">@{profile?.handle}</ThemedText>

          <ThemedText type="extraSmall" color="supporting">
            {distance}
          </ThemedText>
        </View>
      </Flex>

      <VerticalSpacing size={3} />

      <WorkoutStats workout={workout} />

      <VerticalSpacing size={6} />
    </>
  );
};

const styles = StyleSheet.create({
  userInfoContainer: {
    borderTopLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
});

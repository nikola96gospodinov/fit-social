import { useGetProfile } from "@/src/services/profile/get-profile.service";
import { View } from "react-native";
import { useGetProfilePic } from "@/src/services/profile/get-profile-pic.service";
import { Flex } from "@/src/components/ui/layout/flex/flex.component";
import { colors } from "@/src/constants/colors.constants";
import { useColorScheme, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { FontAwesome } from "@expo/vector-icons";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { getWorkoutDistance } from "../../index/past-workouts/past-workout-box/past-workout-box.utils";
import { useLocalSearchParams } from "expo-router";
import { useGetWorkoutById } from "@/src/services/workout/get-workout-by-id.service";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { WorkoutStats } from "@/src/features/workouts/past-workout/workout-stats/workout-stats.component";

export const ViewWorkoutListHeader = () => {
  const theme = useColorScheme() ?? "light";

  const { data: profile } = useGetProfile();
  const { data: profilePic } = useGetProfilePic();

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
          {profilePic ? (
            <Image
              source={{
                uri: profilePic,
              }}
              style={styles.image}
            />
          ) : (
            <FontAwesome
              name="user-circle"
              size={32}
              color={colors[theme].icon}
            />
          )}
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

  image: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
});

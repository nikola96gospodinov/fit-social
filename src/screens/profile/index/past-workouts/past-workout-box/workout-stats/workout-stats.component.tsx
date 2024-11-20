import { Flex } from "@/src/components/ui/layout/flex/flex.component";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { colors } from "@/src/constants/colors.constants";
import { useGetProfile } from "@/src/services/profile/get-profile.service";
import { Ionicons, FontAwesome6 } from "@expo/vector-icons";
import { useColorScheme } from "react-native";
import { useGetTotalWeight } from "../hooks/use-get-total-weight";
import { useGetWorkoutPRs } from "@/src/services/workout/get-workout-prs.service";
import { getDurationInHoursAndMinutes } from "@/src/utils/dates.utils";
import { METRIC } from "@/src/screens/profile/edit/edit-profile-form/edit-profile-form.schema";
import { Tables } from "@/src/types/database.types";

type Props = {
  workout: Tables<"workouts">;
};

export const WorkoutStats = ({ workout }: Props) => {
  const theme = useColorScheme() ?? "light";

  const { data: profile } = useGetProfile();

  const totalWeight = useGetTotalWeight(workout.id);
  const duration = getDurationInHoursAndMinutes(workout.started, workout.ended);
  const weightUnit = profile?.measurement_system === METRIC ? "kg" : "lbs";

  const { data: workoutPRs } = useGetWorkoutPRs({
    ended: workout.ended,
    workoutId: workout.id,
    handle: workout.user_handle,
  });

  return (
    <Flex direction="row" gap={6} align="center">
      <Flex direction="row" gap={1} align="center">
        <Ionicons name="timer-outline" size={12} color={colors[theme].icon} />

        <ThemedText type="extraSmall">{duration}</ThemedText>
      </Flex>

      <Flex direction="row" gap={1} align="center">
        <FontAwesome6 name="dumbbell" size={12} color={colors[theme].icon} />

        <ThemedText type="extraSmall">
          {totalWeight} {weightUnit}
        </ThemedText>
      </Flex>

      <Flex direction="row" gap={1} align="center">
        <Ionicons name="trophy-outline" size={12} color={colors[theme].icon} />

        <ThemedText type="extraSmall">
          {workoutPRs ?? 0} PR{workoutPRs === 1 ? "" : "s"}
        </ThemedText>
      </Flex>
    </Flex>
  );
};

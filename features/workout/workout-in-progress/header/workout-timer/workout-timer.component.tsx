import { ThemedText } from "@/components/ui/themed-text.component";
import { colors } from "@/constants/colors.constants";
import { useGetTimer } from "@/hooks/use-get-timer";
import { useActiveWorkoutStore } from "@/store/active-workout-store";
import { getFormattedTimeFromMilliseconds } from "@/utils/dates.utils";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useColorScheme } from "react-native";

export const WorkoutTimer = () => {
  const colorScheme = useColorScheme();

  const { workout } = useActiveWorkoutStore();

  const timeSinceStarted = useGetTimer({
    startTime: workout?.started,
  });

  const formattedTime = getFormattedTimeFromMilliseconds(timeSinceStarted);

  return (
    <ThemedText>
      <MaterialCommunityIcons
        name="timer-outline"
        size={16}
        color={colors[colorScheme ?? "light"].text}
      />{" "}
      {formattedTime}
    </ThemedText>
  );
};

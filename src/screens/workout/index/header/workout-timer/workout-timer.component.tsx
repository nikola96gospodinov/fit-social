import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { colors } from "@/src/constants/colors.constants";
import { useGetTimer } from "@/src/hooks/use-get-timer";
import { useActiveWorkoutStore } from "@/src/store/active-workout-store";
import { getFormattedTimeFromMilliseconds } from "@/src/utils/dates.utils";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useColorScheme } from "react-native";

export const WorkoutTimer = () => {
  const colorScheme = useColorScheme() ?? "light";

  const {
    store: { started },
  } = useActiveWorkoutStore();

  const timeSinceStarted = useGetTimer({
    startTime: started,
  });

  const formattedTime = getFormattedTimeFromMilliseconds(timeSinceStarted);

  return (
    <ThemedText>
      <MaterialCommunityIcons
        name="timer-outline"
        size={16}
        color={colors[colorScheme].textIcon}
      />{" "}
      {formattedTime}
    </ThemedText>
  );
};

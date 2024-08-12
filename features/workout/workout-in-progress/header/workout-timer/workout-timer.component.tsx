import { ThemedText } from "@/components/ui/themed-text.component";
import { colors } from "@/constants/colors.constants";
import { useGetTimer } from "@/hooks/use-get-timer";
import { useStore } from "@/store";
import { getFormattedTimeFromMilliseconds } from "@/utils/dates.utils";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useColorScheme } from "react-native";

export const WorkoutTimer = () => {
  const colorScheme = useColorScheme();

  const { workout } = useStore();

  const timeSinceStarted = useGetTimer({
    startTime: workout?.started,
  });

  const formattedTime = getFormattedTimeFromMilliseconds(timeSinceStarted);

  return (
    <ThemedText style={{ marginLeft: 12 }}>
      <MaterialCommunityIcons
        name="timer-outline"
        size={16}
        color={colors[colorScheme ?? "light"].text}
      />{" "}
      {formattedTime}
    </ThemedText>
  );
};

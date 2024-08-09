import { ThemedText } from "@/components/ui/themed-text.component";
import { useGetTimer } from "@/hooks/use-get-timer";
import { useStore } from "@/store";
import { getFormattedTimeFromMilliseconds } from "@/utils/dates.utils";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const WorkoutTimer = () => {
  const { workout } = useStore();

  const timeSinceStarted = useGetTimer({
    startTime: workout?.started,
  });

  return (
    <ThemedText style={{ marginRight: 12 }}>
      <MaterialCommunityIcons name="timer-outline" size={16} color="black" />{" "}
      {getFormattedTimeFromMilliseconds(timeSinceStarted)}
    </ThemedText>
  );
};

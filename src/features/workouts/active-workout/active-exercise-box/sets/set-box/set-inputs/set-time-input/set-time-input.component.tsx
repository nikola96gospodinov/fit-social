import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { colors } from "@/src/constants/colors.constants";
import { spacing } from "@/src/constants/spacing.constants";
import { useActiveWorkoutStore } from "@/src/store/active-workout-store";
import { ActiveSet } from "@/src/store/active-workout-store";
import { ActiveExercise } from "@/src/store/active-workout-store";
import { useState } from "react";
import { Pressable, StyleSheet, useColorScheme } from "react-native";
import { TimerPickerModal } from "react-native-timer-picker";

type Props = {
  set: ActiveSet;
  exercise: ActiveExercise;
  isOnlyField: boolean;
};

export const SetTimeInput = ({ set, exercise, isOnlyField }: Props) => {
  const {
    store: { updateSet },
  } = useActiveWorkoutStore();

  const theme = useColorScheme() ?? "light";

  const [showPicker, setShowPicker] = useState(false);

  return (
    <>
      <Pressable
        onPress={() => setShowPicker(true)}
        style={[
          styles.timeContainer,
          {
            backgroundColor: colors[theme].sectionBackground,
            borderColor: colors[theme].border,
            width: isOnlyField ? 128 : 64,
          },
        ]}>
        <ThemedText type="small">{String(set.time)}</ThemedText>
      </Pressable>

      <TimerPickerModal
        visible={showPicker}
        initialValue={parseTime(set.time ?? "00:00")}
        setIsVisible={setShowPicker}
        onConfirm={(pickedDuration) => {
          updateSet({
            exerciseId: exercise.exercise_id,
            setId: set.id,
            time: formatTime(pickedDuration),
          });
          setShowPicker(false);
        }}
        modalTitle="Set Time"
        onCancel={() => setShowPicker(false)}
        closeOnOverlayPress
        styles={{
          theme: "dark",
          backgroundColor: colors[theme].cardBackground,
          pickerItem: {
            fontSize: 20,
            color: colors[theme].text,
          },
          pickerLabel: {
            fontSize: 16,
            color: colors[theme].text,
            margin: 0,
          },
          modalTitle: {
            fontSize: 20,
            color: colors[theme].text,
          },
          confirmButton: {
            backgroundColor: colors[theme].buttonFill,
            borderColor: colors[theme].buttonFill,
            color: colors[theme].buttonTextColor,
            borderRadius: 16,
            paddingHorizontal: spacing[4],
            paddingVertical: spacing[2],
          },
          cancelButton: {
            backgroundColor: "transparent",
            borderColor: colors[theme].buttonFill,
            color: colors[theme].text,
            borderRadius: 16,
            paddingHorizontal: spacing[4],
            paddingVertical: spacing[2],
          },
        }}
        modalProps={{
          overlayOpacity: 0.7,
        }}
      />
    </>
  );
};

const formatTime = ({
  hours,
  minutes,
  seconds,
}: {
  hours?: number;
  minutes?: number;
  seconds?: number;
}) => {
  const timeParts = [];

  if (hours !== undefined && hours > 0) {
    timeParts.push(hours.toString().padStart(2, "0"));
  }
  if (minutes !== undefined) {
    timeParts.push(minutes.toString().padStart(2, "0"));
  }
  if (seconds !== undefined) {
    timeParts.push(seconds.toString().padStart(2, "0"));
  }

  return timeParts.join(":");
};

const parseTime = (
  timeString: string,
): { hours?: number; minutes?: number; seconds?: number } => {
  const parts = timeString.split(":");

  // Handle different formats (HH:MM:SS, MM:SS, or SS)
  if (parts.length === 3) {
    return {
      hours: parseInt(parts[0], 10),
      minutes: parseInt(parts[1], 10),
      seconds: parseInt(parts[2], 10),
    };
  } else if (parts.length === 2) {
    return {
      minutes: parseInt(parts[0], 10),
      seconds: parseInt(parts[1], 10),
    };
  } else {
    return {
      seconds: parseInt(parts[0], 10),
    };
  }
};

const styles = StyleSheet.create({
  timeContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 3,
    borderRadius: 16,
    borderWidth: 1,
  },
});

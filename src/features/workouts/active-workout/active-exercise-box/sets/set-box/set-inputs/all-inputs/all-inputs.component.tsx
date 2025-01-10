import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { ActiveSet } from "@/src/store/active-workout-store";
import { ActiveExercise } from "@/src/store/active-workout-store";
import { SetTimeInput } from "../set-time-input/set-time-input.component";
import { SetDistanceInput } from "../set-distance-input/set-distance-input.component";
import { SetRepsInput } from "../set-reps-input/set-reps-input.component";
import { SetWeightInput } from "../set-weight-input/set-weight-input.component";
import {
  DISTANCE_DISPLAY,
  REPS_DISPLAY,
  TIME_DISPLAY,
  WEIGHT_DISPLAY,
} from "../../../sets.constants";
import { MEASUREMENT_TYPE_DISPLAYS } from "../../../sets.constants";

type Props = {
  set: ActiveSet;
  exercise: ActiveExercise;
};

export const AllInputs = ({ set, exercise }: Props) => {
  const displayFields =
    MEASUREMENT_TYPE_DISPLAYS[exercise.measurement_type] ?? [];
  const showWeight = displayFields.includes(WEIGHT_DISPLAY);
  const showReps = displayFields.includes(REPS_DISPLAY);
  const showTime = displayFields.includes(TIME_DISPLAY);
  const showDistance = displayFields.includes(DISTANCE_DISPLAY);

  const isOnlyField = displayFields.length === 1;

  return (
    <>
      {showWeight && <SetWeightInput set={set} exercise={exercise} />}

      {showReps && showWeight && <ThemedText>x</ThemedText>}

      {showReps && (
        <SetRepsInput set={set} exercise={exercise} isOnlyField={isOnlyField} />
      )}

      {showWeight && showTime && <ThemedText>x</ThemedText>}

      {showTime && (
        <SetTimeInput set={set} exercise={exercise} isOnlyField={isOnlyField} />
      )}

      {showTime && showDistance && <ThemedText>x</ThemedText>}

      {showDistance && <SetDistanceInput set={set} exercise={exercise} />}
    </>
  );
};

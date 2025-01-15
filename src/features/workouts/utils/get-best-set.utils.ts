import { MEASUREMENT_TYPE } from "@/src/constants/workout.constants";
import { Enums, Tables } from "@/src/types/database.types";

type Props = {
  sets?: Tables<"exercise_sets">[];
  measurementType?: Enums<"exercise_measurement_type">;
};

export const getBestSet = ({ sets, measurementType }: Props) => {
  switch (measurementType) {
    case MEASUREMENT_TYPE.REPS_ONLY:
      return getBestSetForRepsOnly(sets);
    case MEASUREMENT_TYPE.TIME_ONLY:
      return getBestSetForTimeOnly(sets);
    case MEASUREMENT_TYPE.TIME_AND_DISTANCE:
      return getBestSetForTimeAndDistance(sets);
    case MEASUREMENT_TYPE.TIME_AND_ADDED_WEIGHT:
      return getBestSetForTimeAndAddedWeight(sets);
    case MEASUREMENT_TYPE.REPS_AND_SUBTRACTED_WEIGHT:
      return getBestSetForRepsAndSubtractedWeight(sets);
    case MEASUREMENT_TYPE.REPS_AND_ADDED_WEIGHT:
      return getBestSetForRepsAndAddedWeight(sets);
    default:
      return getBestSetForRepsAndAddedWeight(sets);
  }
};

const getBestSetForRepsAndAddedWeight = (sets?: Tables<"exercise_sets">[]) => {
  if (!sets?.length)
    return {
      weight: 0,
      reps: 0,
      distance: null,
      time: null,
    } as Tables<"exercise_sets">;

  const hasWeight = sets.some((set) => set.weight && set.weight > 0);

  if (!hasWeight) {
    return sets.reduce((prev, current) => {
      return (current.reps ?? 0) > (prev.reps ?? 0) ? current : prev;
    });
  }

  return sets.reduce(
    (prev, current) => {
      const prevEpley = (prev.weight ?? 0) * (1 + (prev.reps ?? 0) / 30);
      const currentEpley =
        (current.weight ?? 0) * (1 + (current.reps ?? 0) / 30);
      return currentEpley > prevEpley ? current : prev;
    },
    { weight: 0, reps: 0 } as Tables<"exercise_sets">,
  );
};

const getBestSetForRepsOnly = (sets?: Tables<"exercise_sets">[]) => {
  if (!sets?.length)
    return {
      reps: 0,
      weight: null,
      distance: null,
      time: null,
    } as Tables<"exercise_sets">;

  return sets.reduce((prev, current) => {
    return (current.reps ?? 0) > (prev.reps ?? 0) ? current : prev;
  });
};

const getBestSetForTimeOnly = (sets?: Tables<"exercise_sets">[]) => {
  if (!sets?.length)
    return {
      time: 0,
      reps: null,
      weight: null,
      distance: null,
    } as Tables<"exercise_sets">;

  return sets.reduce((prev, current) => {
    return (current.time ?? 0) > (prev.time ?? 0) ? current : prev;
  });
};

const getBestSetForTimeAndDistance = (sets?: Tables<"exercise_sets">[]) => {
  if (!sets?.length)
    return {
      time: 0,
      distance: 0,
      reps: null,
      weight: null,
    } as Tables<"exercise_sets">;

  return sets.reduce((prev, current) => {
    const prevSpeed = (prev.distance ?? 0) / (prev.time ?? 1);
    const currentSpeed = (current.distance ?? 0) / (current.time ?? 1);
    return currentSpeed > prevSpeed ? current : prev;
  });
};

const getBestSetForTimeAndAddedWeight = (sets?: Tables<"exercise_sets">[]) => {
  if (!sets?.length)
    return {
      time: 0,
      weight: 0,
      reps: null,
      distance: null,
    } as Tables<"exercise_sets">;

  return sets.reduce((prev, current) => {
    const prevDensity = (prev.weight ?? 0) * (prev.time ?? 0);
    const currentDensity = (current.weight ?? 0) * (current.time ?? 0);
    return currentDensity > prevDensity ? current : prev;
  });
};

const getBestSetForRepsAndSubtractedWeight = (
  sets?: Tables<"exercise_sets">[],
) => {
  if (!sets?.length)
    return {
      reps: 0,
      weight: null,
      distance: null,
      time: null,
    } as Tables<"exercise_sets">;

  return sets.reduce((prev, current) => {
    const prevScore = (prev.reps ?? 0) * (1 / (prev.weight ?? 1));
    const currentScore = (current.reps ?? 0) * (1 / (current.weight ?? 1));
    return currentScore > prevScore ? current : prev;
  });
};

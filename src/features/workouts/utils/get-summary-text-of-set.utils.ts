import { MEASUREMENT_TYPE } from "@/src/constants/workout.constants";
import { METRIC } from "@/src/screens/profile/edit/edit-profile-form/edit-profile-form.schema";
import { Enums, Tables } from "@/src/types/database.types";
import { formatTime } from "@/src/utils/dates.utils";

type Props = {
  set: Tables<"exercise_sets">;
  measurementType?: Enums<"exercise_measurement_type">;
  measurementSystem?: Enums<"measurement_system"> | null;
};

export const getSummaryTextOfSet = ({
  set,
  measurementType,
  measurementSystem,
}: Props) => {
  const weightUnit = measurementSystem === METRIC ? "kg" : "lbs";
  const distanceUnit = measurementSystem === METRIC ? "km" : "mi";

  switch (measurementType) {
    case MEASUREMENT_TYPE.TIME_ONLY:
      return formatTime(set.time);
    case MEASUREMENT_TYPE.TIME_AND_DISTANCE:
      return `${set.distance} ${distanceUnit} x ${formatTime(set.time)}`;
    case MEASUREMENT_TYPE.TIME_AND_ADDED_WEIGHT:
      return `${set.weight} ${weightUnit} x ${formatTime(set.time)}`;
    case MEASUREMENT_TYPE.REPS_ONLY:
      return `${set.reps} rep${set.reps === 1 ? "" : "s"}`;
    case MEASUREMENT_TYPE.REPS_AND_SUBTRACTED_WEIGHT:
      return `${set.reps} rep${set.reps === 1 ? "" : "s"} x -${set.weight} ${weightUnit}`;
    case MEASUREMENT_TYPE.REPS_AND_ADDED_WEIGHT:
    default:
      if (set.weight === 0) {
        return `${set.reps} rep${set.reps === 1 ? "" : "s"}`;
      }
      return `${set.weight} ${weightUnit} x ${set.reps} rep${set.reps === 1 ? "" : "s"}`;
  }
};

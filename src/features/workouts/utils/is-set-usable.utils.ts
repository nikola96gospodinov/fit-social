import { MEASUREMENT_TYPE } from "@/src/constants/workout.constants";
import { ActiveExercise, ActiveSet } from "@/src/store/active-workout-store";
import { convertTimeToSeconds } from "@/src/utils/dates.utils";

type Props = {
  set: ActiveSet;
  exercises: ActiveExercise[];
};

export const isSetUsable = ({ set, exercises }: Props) => {
  if (!set.is_done) return false;

  const exercise = exercises.find((e) => e.id === set.exercise_id);
  const measurementType = exercise?.measurement_type;

  switch (measurementType) {
    case MEASUREMENT_TYPE.REPS_ONLY:
    case MEASUREMENT_TYPE.REPS_AND_ADDED_WEIGHT:
    case MEASUREMENT_TYPE.REPS_AND_SUBTRACTED_WEIGHT:
      return set.reps && parseInt(set.reps) > 0;

    case MEASUREMENT_TYPE.TIME_ONLY:
    case MEASUREMENT_TYPE.TIME_AND_DISTANCE:
    case MEASUREMENT_TYPE.TIME_AND_ADDED_WEIGHT:
      return set.time && convertTimeToSeconds(set.time) > 0;

    default:
      return false;
  }
};

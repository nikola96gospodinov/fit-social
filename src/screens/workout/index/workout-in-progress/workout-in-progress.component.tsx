import { useActiveWorkoutStore } from "@/src/store/active-workout-store";
import { EmptyWorkout } from "./empty-workout/empty-workout.component";
import { isEmpty } from "lodash";
import { ActiveWorkout } from "./active-workout/active-workout.component";

export const WorkoutInProgress = () => {
  const {
    store: { exercises },
  } = useActiveWorkoutStore();

  if (isEmpty(exercises)) {
    return <EmptyWorkout />;
  }

  return <ActiveWorkout />;
};

import { useActiveWorkoutStore } from "@/src/store/active-workout-store";
import { StartWorkout } from "./start-workout/start-workout.component";
import { WorkoutInProgress } from "./workout-in-progress/workout-in-progress.component";

export const WorkoutIndexContent = () => {
  const { addStartedTime } = useActiveWorkoutStore();

  if (addStartedTime) {
    return <WorkoutInProgress />;
  }

  return <StartWorkout />;
};

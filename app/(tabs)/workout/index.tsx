import { StartWorkout } from "@/features/workout/start-workout/start-workout.component";
import { WorkoutInProgress } from "@/features/workout/workout-in-progress/workout-in-progress.component";
import { useActiveWorkoutStore } from "@/store/active-workout-store";

const AddWorkout = () => {
  const { started } = useActiveWorkoutStore();

  if (started) {
    return <WorkoutInProgress />;
  }

  return <StartWorkout />;
};

export default AddWorkout;

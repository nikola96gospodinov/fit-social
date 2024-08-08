import { StartWorkout } from "@/features/workout/start-workout/start-workout.component";
import { WorkoutInProgress } from "@/features/workout/workout-in-progress/workout-in-progress.component";
import { useStore } from "@/store";

const AddWorkout = () => {
  const { workout } = useStore();

  if (workout) {
    return <WorkoutInProgress />;
  }

  return <StartWorkout />;
};

export default AddWorkout;

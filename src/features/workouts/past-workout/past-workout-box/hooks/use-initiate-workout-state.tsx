import { useGetWorkoutExercises } from "@/src/services/workout/get-workout-exercises.service";
import { useGetWorkoutSets } from "@/src/services/workout/get-workout-sets.service";
import { useActiveWorkoutStore } from "@/src/store/active-workout-store";
import { Tables } from "@/src/types/database.types";

type Props = {
  workout: Tables<"workouts">;
};

export const useInitiateWorkoutState = ({ workout }: Props) => {
  const {
    store: { initiateState },
  } = useActiveWorkoutStore();

  const { data: exercises = [], isLoading: exercisesLoading } =
    useGetWorkoutExercises(workout.id);
  const { data: sets = [], isLoading: setsLoading } = useGetWorkoutSets(
    workout.id,
  );

  const isLoading = exercisesLoading || setsLoading;

  const handleInitiateState = () => {
    initiateState({
      started: new Date(workout.started),
      ended: new Date(workout.ended),
      exercises,
      sets,
      title: workout.title ?? "",
      id: workout.id,
    });
  };

  return { isLoading, handleInitiateState };
};

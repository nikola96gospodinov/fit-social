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

  const flatExercises = exercises.map((exercise) => ({
    exercise_id: exercise.id,
    id: exercise.id,
    workout_id: exercise.workout_id,
    ...exercise.exercises,
    name: exercise.exercises!.name,
    measurement_type: exercise.exercises!.measurement_type,
  }));

  const configuredSets = sets.map((set) => ({
    ...set,
    reps: set.reps?.toString() ?? null,
    weight: set.weight?.toString() ?? null,
    time: set.time?.toString() ?? null,
    distance: set.distance?.toString() ?? null,
  }));

  const handleInitiateState = () => {
    initiateState({
      started: new Date(workout.started),
      ended: new Date(workout.ended),
      exercises: flatExercises,
      sets: configuredSets,
      title: workout.title ?? "",
      id: workout.id,
    });
  };

  return { isLoading, handleInitiateState };
};

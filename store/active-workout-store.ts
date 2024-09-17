import { Exercise } from "@/types/api/exercise.types";
import { ActiveExercise } from "@/types/workout.types";
import { create } from "zustand";
import { randomUUID } from "expo-crypto";

type State = {
  started?: Date;
  exercises: ActiveExercise[];
};

type Action = {
  startWorkout: (started: Date) => void;
  finishWorkout: () => void;
  addExercises: (exercise: Exercise[]) => void;
  removeExercise: (id: string) => void;
  addSet: (exerciseId: string) => void;
  updateSet: ({
    exerciseId,
    setId,
    reps,
    weight,
    isDone,
  }: {
    exerciseId: string;
    setId: string;
    reps?: number;
    weight?: number;
    isDone?: boolean;
  }) => void;
};

export const useActiveWorkoutStore = create<State & Action>((set) => ({
  exercises: [],
  startWorkout: (started) => set({ started }),
  finishWorkout: () => set({ started: undefined, exercises: [] }),
  addExercises: (exercises) => {
    const activeExercises = exercises.map(({ id, name }) => ({
      id,
      name,
      sets: [],
    }));

    set((state) => ({ exercises: [...state.exercises, ...activeExercises] }));
  },
  removeExercise: (id) => {
    set((state) => ({
      exercises: state.exercises.filter((exercise) => exercise.id !== id),
    }));
  },
  addSet: (exerciseId) => {
    set((state) => {
      const exercise = state.exercises.find(
        (exercise) => exercise.id === exerciseId,
      );

      if (!exercise) {
        return state;
      }

      const newSet = {
        id: randomUUID(),
        reps: 0,
        weight: 0,
        isDone: false,
      };

      return {
        exercises: state.exercises.map((exercise) => {
          if (exercise.id === exerciseId) {
            return {
              ...exercise,
              sets: exercise.sets ? exercise.sets.concat(newSet) : [newSet],
            };
          }
          return exercise;
        }),
      };
    });
  },
  updateSet: ({ exerciseId, setId, reps, weight, isDone }) => {
    set((state) => {
      const exercise = state.exercises.find(
        (exercise) => exercise.id === exerciseId,
      );

      if (!exercise) {
        return state;
      }

      const set = exercise.sets?.find((set) => set.id === setId);

      if (!set) {
        return state;
      }

      return {
        exercises: state.exercises.map((exercise) =>
          exercise.id === exerciseId
            ? {
                ...exercise,
                sets: exercise.sets?.map((set) =>
                  set.id === setId
                    ? {
                        ...set,
                        reps: reps === undefined ? set.reps : reps,
                        weight: weight === undefined ? set.weight : weight,
                        isDone: isDone ?? false,
                      }
                    : set,
                ),
              }
            : exercise,
        ),
      };
    });
  },
}));

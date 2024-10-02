import { Exercise } from "@/src/types/api/exercise.types";
import { ActiveExercise } from "@/src/types/workout.types";
import { create } from "zustand";
import { randomUUID } from "expo-crypto";

type State = {
  started?: Date;
  exercises: ActiveExercise[];
};

type Action = {
  // This is for reordering exercises
  setExercises: (exercises: ActiveExercise[]) => void;
  startWorkout: (started: Date) => void;
  finishWorkout: () => void;
  addExercises: (exercise: Exercise[]) => void;
  removeExercise: (id: string) => void;
  // This is for reordering sets
  setSets: (exerciseId: string, sets: ActiveExercise["sets"]) => void;
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
  removeSet: ({
    exerciseId,
    setId,
  }: {
    exerciseId: string;
    setId: string;
  }) => void;
};

export const useActiveWorkoutStore = create<State & Action>((set) => ({
  exercises: [],
  setExercises: (exercises) => set({ exercises }),
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
  setSets: (exerciseId, sets) => {
    set((state) => {
      return {
        exercises: state.exercises.map((exercise) =>
          exercise.id === exerciseId ? { ...exercise, sets } : exercise,
        ),
      };
    });
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
                        isDone: isDone ?? set.isDone,
                      }
                    : set,
                ),
              }
            : exercise,
        ),
      };
    });
  },
  removeSet: ({ exerciseId, setId }) => {
    set((state) => {
      const exercise = state.exercises.find(
        (exercise) => exercise.id === exerciseId,
      );

      if (!exercise) {
        return state;
      }

      return {
        exercises: state.exercises.map((exercise) =>
          exercise.id === exerciseId
            ? {
                ...exercise,
                sets: exercise.sets?.filter((set) => set.id !== setId),
              }
            : exercise,
        ),
      };
    });
  },
}));

import { Exercise } from "@/src/types/api/exercise.types";
import { create } from "zustand";
import { randomUUID } from "expo-crypto";
import { Tables } from "../types/database.types";

export type ActiveExercise = Omit<
  Tables<"workout_exercises">,
  "workout_id" | "id"
>;

export type ActiveSet = Omit<Tables<"exercise_sets">, "workout_exercise_id"> & {
  exercise_id: string;
};

export type State = {
  started?: Date;
  exercises: ActiveExercise[];
  sets: ActiveSet[];
  title: string;
};

type Action = {
  setTitle: (title: string) => void;
  // This is for reordering exercises
  setExercises: (exercises: ActiveExercise[]) => void;
  startWorkout: (started: Date) => void;
  resetWorkout: () => void;
  addExercises: (exercise: Exercise[]) => void;
  removeExercise: (id: string) => void;
  // This is for reordering sets
  setSets: (exerciseId: string, sets: ActiveSet[]) => void;
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
  getSetsForExercise: (exerciseId: string) => ActiveSet[];
};

export const useActiveWorkoutStore = create<State & Action>((set, get) => ({
  exercises: [],
  sets: [],
  title: "",
  setTitle: (title) => set({ title }),
  startWorkout: (started) => set({ started }),
  resetWorkout: () => set({ started: undefined, exercises: [], sets: [] }),
  setExercises: (exercises) => set({ exercises }),
  addExercises: (exercises) => {
    const activeExercises = exercises.map(({ id, name }) => ({
      id: randomUUID(),
      exercise_id: id,
      name,
    }));

    set((state) => ({ exercises: [...state.exercises, ...activeExercises] }));
  },
  removeExercise: (id) => {
    set((state) => ({
      exercises: state.exercises.filter(
        (exercise) => exercise.exercise_id !== id,
      ),
    }));
  },
  setSets: (exerciseId, sets) => {
    set((state) => {
      const newSets = state.sets.filter(
        (set) => set.exercise_id !== exerciseId,
      );

      return {
        sets: [...newSets, ...sets],
      };
    });
  },
  addSet: (exerciseId) => {
    set((state) => {
      const exercise = state.exercises.find(
        (exercise) => exercise.exercise_id === exerciseId,
      );

      if (!exercise) {
        return state;
      }

      const newSet = {
        id: randomUUID(),
        reps: 0,
        weight: 0,
        is_done: false,
        exercise_id: exerciseId,
      };

      return {
        sets: [...state.sets, newSet],
      };
    });
  },
  updateSet: ({ setId, reps, weight, isDone }) => {
    set((state) => {
      const sets = state.sets.map((set) =>
        set.id === setId
          ? {
              ...set,
              reps: reps === undefined ? set.reps : reps,
              weight: weight === undefined ? set.weight : weight,
              is_done: isDone ?? set.is_done,
            }
          : set,
      );

      return {
        sets,
      };
    });
  },
  removeSet: ({ setId }) => {
    set((state) => {
      const sets = state.sets.filter((set) => set.id !== setId);

      return {
        sets,
      };
    });
  },
  getSetsForExercise: (exerciseId) => {
    return get().sets.filter((set) => set.exercise_id === exerciseId);
  },
}));

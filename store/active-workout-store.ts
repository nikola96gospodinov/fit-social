import { Exercise } from "@/types/api/exercise.types";
import { ActiveExercise } from "@/types/workout.types";
import { create } from "zustand";

type State = {
  started?: Date;
  exercises: ActiveExercise[];
};

type Action = {
  startWorkout: (started: Date) => void;
  finishWorkout: () => void;
  addExercises: (exercise: Exercise[]) => void;
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
}));

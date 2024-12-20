import { Exercise } from "@/src/types/api/exercise.types";
import { create } from "zustand";
import { randomUUID } from "expo-crypto";
import { Tables } from "../types/database.types";
import { useActionStore, WORKOUT_ACTION, WorkoutAction } from "./action-store";

export type ActiveExercise = Omit<Tables<"workout_exercises">, "workout_id">;

export type ActiveSet = Omit<Tables<"exercise_sets">, "workout_exercise_id"> & {
  exercise_id: string;
};

export type State = {
  started?: Date;
  ended?: Date;
  exercises: ActiveExercise[];
  sets: ActiveSet[];
  title: string;
  id?: string;
};

type Action = {
  setTitle: (title: string) => void;
  // This is for reordering exercises
  setExercises: (exercises: ActiveExercise[]) => void;
  startWorkout: (action?: WorkoutAction) => void;
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
  // This is for when loading an already existing workout
  initiateState: (state: State) => void;
  setStarted: (started: Date) => void;
  setEnded: (ended: Date) => void;
};

const createActiveWorkoutStore = () =>
  create<State & Action>((set, get) => ({
    exercises: [],
    sets: [],
    title: "",
    setTitle: (title) => set({ title }),
    startWorkout: () => set({ started: new Date() }),
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
        sets: state.sets.filter((set) => set.exercise_id !== id),
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
          workout_exercise_id: exercise.id,
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
    initiateState: (state) => set(state),
    setStarted: (started) => set({ started }),
    setEnded: (ended) => set({ ended }),
  }));

const addWorkoutStore = createActiveWorkoutStore();
const editWorkoutStore = createActiveWorkoutStore();

export const useActiveWorkoutStore = () => {
  const { action } = useActionStore();

  const editStore = editWorkoutStore();
  const addStore = addWorkoutStore();

  const store = action === WORKOUT_ACTION.ADD ? addStore : editStore;

  return {
    store,
    addStartedTime: addStore.started,
  };
};

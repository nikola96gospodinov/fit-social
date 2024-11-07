import { Exercise } from "@/src/types/api/exercise.types";
import { create } from "zustand";
import { randomUUID } from "expo-crypto";
import { Tables } from "../types/database.types";
import { createContext, PropsWithChildren, useContext, useState } from "react";

export type ActiveExercise = Omit<
  Tables<"workout_exercises">,
  "workout_id" | "id"
>;

export type ActiveSet = Omit<Tables<"exercise_sets">, "workout_exercise_id"> & {
  exercise_id: string;
};

export const WORKOUT_ACTION = {
  ADD: "add",
  EDIT: "edit",
} as const;

type WorkoutAction = (typeof WORKOUT_ACTION)[keyof typeof WORKOUT_ACTION];

export type State = {
  started?: Date;
  ended?: Date;
  exercises: ActiveExercise[];
  sets: ActiveSet[];
  title: string;
  action: WorkoutAction;
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
  initiateState: (state: Omit<State, "action">) => void;
  setStarted: (started: Date) => void;
  setEnded: (ended: Date) => void;
};

const createActiveWorkoutStore = (action: WorkoutAction) =>
  create<State & Action>((set, get) => ({
    action,
    exercises: [],
    sets: [],
    title: "",
    setTitle: (title) => set({ title }),
    startWorkout: (action) => set({ started: new Date(), action }),
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

export const addWorkoutStore = createActiveWorkoutStore(WORKOUT_ACTION.ADD);
export const editWorkoutStore = createActiveWorkoutStore(WORKOUT_ACTION.EDIT);

const ActiveWorkoutContext = createContext<{
  store: State & Action;
  setAction: React.Dispatch<React.SetStateAction<WorkoutAction>>;
  addStartedTime?: Date; // This is for the add workout tab and to get the right time
}>({
  store: {} as State & Action,
  setAction: () => {},
});

export const ActiveWorkoutProvider = ({ children }: PropsWithChildren) => {
  const [action, setAction] = useState<WorkoutAction>(WORKOUT_ACTION.ADD);

  const editStore = editWorkoutStore();
  const addStore = addWorkoutStore();

  const store = action === WORKOUT_ACTION.EDIT ? editStore : addStore;

  const value = {
    store,
    setAction,
    addStartedTime: addStore.started,
  };

  return (
    <ActiveWorkoutContext.Provider value={value}>
      {children}
    </ActiveWorkoutContext.Provider>
  );
};

export const useActiveWorkoutStore = () => {
  const context = useContext(ActiveWorkoutContext);

  if (!context) {
    throw new Error(
      "useActiveWorkoutStore must be used within a ActiveWorkoutProvider",
    );
  }

  return context;
};

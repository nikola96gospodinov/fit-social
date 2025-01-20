import { Exercise } from "@/src/types/api/exercise.types";
import { create } from "zustand";
import { randomUUID } from "expo-crypto";
import { Tables } from "../types/database.types";
import { useActionStore, WORKOUT_ACTION, WorkoutAction } from "./action-store";
import { MEASUREMENT_TYPE } from "../constants/workout.constants";

export type ActiveExercise = Omit<Tables<"workout_exercises">, "workout_id"> &
  Pick<Tables<"exercises">, "measurement_type" | "name">;

export type ActiveSet = {
  id: string;
  reps?: string | null;
  weight?: string | null;
  time?: string | null;
  distance?: string | null;
  is_done: boolean;
  exercise_id: string;
  workout_exercise_id: string;
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
    exercise_id,
    set_id,
    reps,
    weight,
    is_done,
    time,
    distance,
  }: {
    exercise_id: string;
    set_id: string;
    reps?: string;
    weight?: string;
    is_done?: boolean;
    time?: string;
    distance?: string;
  }) => void;
  removeSet: ({ setId }: { setId: string }) => void;
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
      const activeExercises = exercises.map(
        ({ id, name, measurement_type }) => ({
          id: randomUUID(), // Id in the workout_exercises table
          exercise_id: id, // Id in the exercises table
          name,
          measurement_type,
        }),
      );

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
    addSet: (workoutExerciseId) => {
      set((state) => {
        const exercise = state.exercises.find(
          (exercise) => exercise.id === workoutExerciseId,
        );

        if (!exercise) {
          return state;
        }

        const { reps, weight, time, distance } = getWeightRepsTimeAndDistance(
          exercise.measurement_type,
        );

        const newSet = {
          id: randomUUID(),
          reps,
          weight,
          time,
          distance,
          is_done: false,
          exercise_id: exercise.exercise_id,
          workout_exercise_id: workoutExerciseId,
        };

        return {
          sets: [...state.sets, newSet],
        };
      });
    },
    updateSet: ({ set_id, ...updates }) => {
      set((state) => ({
        sets: state.sets.map((set) =>
          set.id === set_id
            ? {
                ...set,
                ...(updates.is_done !== undefined && {
                  is_done: updates.is_done,
                }),
                ...(updates.reps !== undefined && {
                  reps: updates.reps,
                }),
                ...(updates.weight !== undefined && {
                  weight: updates.weight,
                }),
                ...(updates.time !== undefined && {
                  time: updates.time,
                }),
                ...(updates.distance !== undefined && {
                  distance: updates.distance,
                }),
              }
            : set,
        ),
      }));
    },
    removeSet: ({ setId }) => {
      set((state) => {
        const sets = state.sets.filter((set) => set.id !== setId);

        return {
          sets,
        };
      });
    },
    getSetsForExercise: (workoutExerciseId) => {
      return get().sets.filter(
        (set) => set.workout_exercise_id === workoutExerciseId,
      );
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

// This is a helper function to get the default values for a new set
const getWeightRepsTimeAndDistance = (
  measurementType: Tables<"exercises">["measurement_type"],
) => {
  const defaults = {
    reps: null,
    weight: null,
    time: null,
    distance: null,
  };

  switch (measurementType) {
    case MEASUREMENT_TYPE.REPS_AND_ADDED_WEIGHT:
    case MEASUREMENT_TYPE.REPS_AND_SUBTRACTED_WEIGHT:
      return { ...defaults, reps: "", weight: "" };

    case MEASUREMENT_TYPE.REPS_ONLY:
      return { ...defaults, reps: "" };

    case MEASUREMENT_TYPE.TIME_ONLY:
      return { ...defaults, time: "00:00" };

    case MEASUREMENT_TYPE.TIME_AND_DISTANCE:
      return { ...defaults, time: "00:00", distance: "" };

    case MEASUREMENT_TYPE.TIME_AND_ADDED_WEIGHT:
      return { ...defaults, time: "00:00", weight: "" };

    default:
      return defaults;
  }
};

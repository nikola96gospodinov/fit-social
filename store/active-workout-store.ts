import { Workout } from "@/types/workout.types";
import { create } from "zustand";

type State = {
  workout?: Workout;
};

type Action = {
  startWorkout: (started: Date) => void;
  finishWorkout: () => void;
};

export const useActiveWorkoutStore = create<State & Action>((set) => ({
  workout: undefined,
  startWorkout: (started) => set({ workout: { started } }),
  finishWorkout: () => set({ workout: undefined }),
}));

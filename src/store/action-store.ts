import { create } from "zustand";

export const WORKOUT_ACTION = {
  ADD: "add",
  EDIT: "edit",
} as const;

export type WorkoutAction =
  (typeof WORKOUT_ACTION)[keyof typeof WORKOUT_ACTION];

type State = {
  action: WorkoutAction;
};

type Action = {
  setAction: (action: WorkoutAction) => void;
};

export const useActionStore = create<State & Action>((set) => ({
  action: WORKOUT_ACTION.ADD,
  setAction: (action) => set({ action }),
}));

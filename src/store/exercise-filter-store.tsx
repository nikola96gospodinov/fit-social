import {
  BODY_PART,
  EQUIPMENT,
  TARGET_MUSCLE,
} from "@/src/constants/workout.constants";
import {
  BodyPart,
  Equipment,
  TargetMuscle,
} from "@/src/constants/workout.constants";
import { createContext, PropsWithChildren, useContext } from "react";
import { create } from "zustand";
import { WORKOUT_ACTION } from "./action-store";
import { useActionStore } from "./action-store";

export type Filter =
  | { type: typeof BODY_PART; value: BodyPart }
  | { type: typeof EQUIPMENT; value: Equipment }
  | { type: typeof TARGET_MUSCLE; value: TargetMuscle };

type State = {
  filters: Filter[];
  activeSearch: string;
};

type Action = {
  setActiveSearch: (search: string) => void;
  clearFilters: () => void;
  addFilter: (filter: Filter) => void;
  removeFilter: (filter: Filter) => void;
  getFilterValues: <T extends Filter["type"]>(
    filterType: T,
  ) => Extract<Filter, { type: T }>["value"][];
};

const createExerciseFilterStore = () =>
  create<State & Action>((set, get) => ({
    filters: [],
    addFilter: (filter) =>
      set((state) => ({ filters: [...state.filters, filter] })),
    removeFilter: (filter) =>
      set((state) => ({
        filters: state.filters.filter((f) => f !== filter),
      })),
    clearFilters: () => set({ filters: [] }),
    activeSearch: "",
    setActiveSearch: (search) => set({ activeSearch: search }),
    getFilterValues: <T extends Filter["type"]>(filterType: T) =>
      get()
        .filters.filter((f) => f.type === filterType)
        .map((f) => f.value) as any[], // Zustand doesn't support all generics with create https://github.com/pmndrs/zustand/discussions/2566, Type safety is still maintained though
  }));

const addExerciseFilterStore = createExerciseFilterStore();
const editExerciseFilterStore = createExerciseFilterStore();

export const ExerciseFilterContext = createContext<State & Action>(
  {} as State & Action,
);

export const ExerciseFilterProvider = ({ children }: PropsWithChildren) => {
  const { action } = useActionStore();

  const store =
    action === WORKOUT_ACTION.EDIT
      ? editExerciseFilterStore()
      : addExerciseFilterStore();

  return (
    <ExerciseFilterContext.Provider value={store}>
      {children}
    </ExerciseFilterContext.Provider>
  );
};
export const useExerciseFilterStore = () => {
  const context = useContext(ExerciseFilterContext);

  if (!context) {
    throw new Error(
      "useExerciseFilterStore must be used within an ExerciseFilterProvider",
    );
  }

  return context;
};
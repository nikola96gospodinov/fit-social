import { EQUIPMENT, MUSCLE_GROUP } from "@/src/constants/workout.constants";
import { create } from "zustand";
import { WORKOUT_ACTION } from "./action-store";
import { useActionStore } from "./action-store";

export type Filter =
  | { type: typeof MUSCLE_GROUP; value: string }
  | { type: typeof EQUIPMENT; value: string };

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

export const useExerciseFilterStore = () => {
  const { action } = useActionStore();

  const addStore = addExerciseFilterStore();
  const editStore = editExerciseFilterStore();

  return action === WORKOUT_ACTION.ADD ? addStore : editStore;
};

import {
  BODY_PART,
  EQUIPMENT,
  TARGET_MUSCLE,
} from "@/constants/workout.constants";
import {
  BodyPart,
  Equipment,
  TargetMuscle,
} from "@/constants/workout.constants";
import { create } from "zustand";

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

export const useExerciseFilterStore = create<State & Action>((set, get) => ({
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

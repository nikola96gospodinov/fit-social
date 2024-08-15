import { ActiveFilter } from "@/types/workout.types";
import { create } from "zustand";

type State = {
  activeFilters: ActiveFilter[];
  activeSearch: string;
};

type Action = {
  setActiveFilters: (filters: any[]) => void;
  setActiveSearch: (search: string) => void;
};

export const useExerciseFilterStore = create<State & Action>((set) => ({
  activeFilters: [],
  activeSearch: "",
  setActiveFilters: (filters) => set({ activeFilters: filters }),
  setActiveSearch: (search) => set({ activeSearch: search }),
}));

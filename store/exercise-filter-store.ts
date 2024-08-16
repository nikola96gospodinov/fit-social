import {
  BodyPart,
  Equipment,
  TargetMuscle,
} from "@/constants/workout.constants";
import { create } from "zustand";

export type ActiveFilters = Array<BodyPart | Equipment | TargetMuscle>;

type State = {
  activeFilters: ActiveFilters;
  activeSearch: string;
};

type Action = {
  setActiveFilter: (filters: ActiveFilters) => void;
  setActiveSearch: (search: string) => void;
};

export const useExerciseFilterStore = create<State & Action>((set) => ({
  activeFilters: [],
  activeSearch: "",
  setActiveFilter: (filters) => set({ activeFilters: filters }),
  setActiveSearch: (search) => set({ activeSearch: search }),
}));

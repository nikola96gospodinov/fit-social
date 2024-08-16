import {
  BodyPart,
  Equipment,
  TargetMuscle,
} from "@/constants/workout.constants";
import { create } from "zustand";

export type ActiveFilters = Array<BodyPart | Equipment | TargetMuscle>;

type State = {
  bodyPartFilters: BodyPart[];
  equipmentFilters: Equipment[];
  targetMuscleFilters: TargetMuscle[];
  activeSearch: string;
};

type Action = {
  setBodyPartFilters: (filters: BodyPart[]) => void;
  setEquipmentFilters: (filters: Equipment[]) => void;
  setTargetMuscleFilters: (filters: TargetMuscle[]) => void;
  setActiveSearch: (search: string) => void;
  getTotalNumberOfFilters: () => number;
};

export const useExerciseFilterStore = create<State & Action>((set, get) => ({
  bodyPartFilters: [],
  setBodyPartFilters: (filters) => set({ bodyPartFilters: filters }),
  equipmentFilters: [],
  setEquipmentFilters: (filters) => set({ equipmentFilters: filters }),
  targetMuscleFilters: [],
  setTargetMuscleFilters: (filters) => set({ targetMuscleFilters: filters }),
  activeSearch: "",
  setActiveSearch: (search) => set({ activeSearch: search }),
  getTotalNumberOfFilters: () =>
    get().bodyPartFilters.length +
    get().equipmentFilters.length +
    get().targetMuscleFilters.length,
}));

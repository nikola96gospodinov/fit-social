type Set = {
  reps: number;
  weight: number;
};

export type ActiveExercise = {
  id: string;
  name: string;
  sets?: Set[];
};

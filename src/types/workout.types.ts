export type ExerciseSet = {
  id: string;
  reps?: number;
  weight?: number;
  isDone: boolean;
};

export type ActiveExercise = {
  id: string;
  name: string;
  sets?: ExerciseSet[];
};

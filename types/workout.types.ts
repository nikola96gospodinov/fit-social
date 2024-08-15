type Set = {
  reps: number;
  weight: number;
};

type Exercise = {
  id: string;
  name: string;
  sets?: Set[];
};

export type Workout = {
  started: Date;
  exercises?: Exercise[];
};

export type ActiveFilter = {
  type: "equipment" | "bodyPart" | "targetMuscle";
  value: string;
};

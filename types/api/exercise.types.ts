import {
  BodyPart,
  Equipment,
  TargetMuscle,
} from "@/constants/workout.constants";

export type Exercise = {
  bodyPart: BodyPart;
  equipment: Equipment;
  gifUrl: string;
  id: string;
  name: string;
  target: TargetMuscle;
  secondaryMuscles: (TargetMuscle | string)[];
  instructions: string[];
};

export type ExerciseResponse = {
  data: Exercise[];
  total: number;
  limit: number;
  offset: number;
};

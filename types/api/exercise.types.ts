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
  secondaryMuscles: Array<TargetMuscle | string>;
  instructions: string[];
};

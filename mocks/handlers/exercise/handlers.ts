import { getExerciseHandler } from "./get-exercises.handler";
import { getExerciseByIdHandler } from "./get-exercise-by-id.handler";
import { getExercisesByEquipmentTypeHandler } from "./get-exercises-by-equipment-type.handler";
import { getExercisesByBodyPartHandler } from "./get-exercises-by-body-part.handler";
import { getExercisesByTargetMuscleHandler } from "./get-exercises-by-target-muscle.handler";

export const exerciseHandlers = [
  getExerciseHandler,
  getExerciseByIdHandler,
  getExercisesByEquipmentTypeHandler,
  getExercisesByBodyPartHandler,
  getExercisesByTargetMuscleHandler,
];

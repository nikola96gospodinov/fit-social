import { GetExercisesProps } from "@/services/exercises/get-all-exercises.service";
import type {
  BodyPart,
  Equipment,
  TargetMuscle,
} from "@/types/api/exercise.types";
import { addQueryParamsToUrl } from "@/utils/url.utils";

export const URL = {
  EXERCISE: {
    base: "https://exercisedb.p.rapidapi.com/exercises/exercise",

    GET_EXERCISES(queryParams?: GetExercisesProps): string {
      return addQueryParamsToUrl(this.base, queryParams ?? {});
    },

    GET_EXERCISES_BY_BODY_PART(bodyPart: BodyPart): string {
      return `${this.base}/bodyPart/${bodyPart}`;
    },

    GET_EXERCISE_BY_EQUIPMENT_TYPE(equipmentType: Equipment): string {
      return `${this.base}/equipment/${equipmentType}`;
    },

    GET_EXERCISE_BY_TARGET_MUSCLE(targetMuscle: TargetMuscle): string {
      return `${this.base}/target/${targetMuscle}`;
    },
  },
};

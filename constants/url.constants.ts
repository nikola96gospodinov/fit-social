import { GetExercisesByBodyPartProps } from "@/services/exercises/get-exercises-by-body-part.service";
import { GetExercisesByEquipmentType } from "@/services/exercises/get-exercises-by-equipment-type.service";
import { GetExercisesByTargetMuscle } from "@/services/exercises/get-exercises-by-target-muscle.service";
import { GetExercisesProps } from "@/services/exercises/types";
import { addQueryParamsToUrl } from "@/utils/url.utils";

export const URL = {
  EXERCISE: {
    base: "https://exercisedb.p.rapidapi.com/exercises/exercise",

    GET_EXERCISES(queryParams?: GetExercisesProps): string {
      return addQueryParamsToUrl(this.base, queryParams);
    },

    GET_EXERCISE_BY_ID(id: string): string {
      return `${this.base}/exercise/${id}`;
    },

    GET_EXERCISES_BY_BODY_PART({
      bodyPart,
      ...queryParams
    }: GetExercisesByBodyPartProps): string {
      const url = `${this.base}/bodyPart/${bodyPart}`;
      return addQueryParamsToUrl(url, queryParams);
    },

    GET_EXERCISES_BY_EQUIPMENT_TYPE({
      equipmentType,
      ...queryParams
    }: GetExercisesByEquipmentType): string {
      const url = `${this.base}/equipment/${equipmentType}`;
      return addQueryParamsToUrl(url, queryParams);
    },

    GET_EXERCISES_BY_TARGET_MUSCLE({
      targetMuscle,
      ...queryParams
    }: GetExercisesByTargetMuscle): string {
      const url = `${this.base}/target/${targetMuscle}`;
      return addQueryParamsToUrl(url, queryParams);
    },
  },
};

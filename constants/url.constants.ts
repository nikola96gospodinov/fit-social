import { addQueryParamsToUrl } from "@/utils/url.utils";

export const URL = {
  EXERCISE: {
    base: "https://exercisedb.p.rapidapi.com/exercises/exercise",

    GET_EXERCISES(queryParams: { limit: number; offset: number }): string {
      return addQueryParamsToUrl(this.base, queryParams);
    },

    // TODO: Be more specific with the body part
    GET_EXERCISES_BY_BODY_PART(bodyPart: string): string {
      return `${this.base}/bodyPart/${bodyPart}`;
    },

    GET_ALL_BODY_PARTS(): string {
      return `${this.base}/bodyPartList`;
    },

    // TODO: Be more specific with the equipment type
    GET_EXERCISE_BY_EQUIPMENT_TYPE(equipmentType: string): string {
      return `${this.base}/equipment/${equipmentType}`;
    },

    GET_ALL_EQUIPMENT_TYPES(): string {
      return `${this.base}/equipmentList`;
    },
  },
};

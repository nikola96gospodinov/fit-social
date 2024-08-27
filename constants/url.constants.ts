import { GetExercisesProps } from "@/services/exercises/get-all-exercises.service";
import { addQueryParamsToUrl } from "@/utils/url.utils";

export const URL = {
  EXERCISE: {
    base: "http://localhost:3000/exercises", // TODO: Change this to the actual URL once deployed

    GET_EXERCISES(queryParams?: GetExercisesProps): string {
      return addQueryParamsToUrl(this.base, queryParams);
    },

    GET_EXERCISE_BY_ID(id: string): string {
      return `${this.base}/exercises/${id}`;
    },

    GET_EXERCISES_BY_IDS(): string {
      return `${this.base}-by-ids`;
    },
  },
};

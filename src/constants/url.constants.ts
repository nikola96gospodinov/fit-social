import { GetExercisesProps } from "@/src/services/exercises/get-all-exercises.service";
import { addQueryParamsToUrl } from "@/utils/url.utils";

export const URL = {
  EXERCISE: {
    base: `${process.env.EXPO_PUBLIC_API_URL}/exercises`,

    GET_EXERCISES(queryParams?: GetExercisesProps): string {
      return addQueryParamsToUrl(this.base, queryParams);
    },

    GET_EXERCISE_BY_ID(id: string): string {
      return `${this.base}/${id}`;
    },

    GET_EXERCISES_BY_IDS(): string {
      return `${this.base}-by-ids`;
    },
  },
};

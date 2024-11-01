import { GetExercisesProps } from "@/src/services/exercises/get-all-exercises.service";
import { addQueryParamsToUrl } from "@/src/utils/url.utils";
import { FindHomeGymProps } from "../services/home-gym/find-home-gym.service";

export const URL = {
  EXERCISE: {
    base: `${process.env.EXPO_PUBLIC_API_URL}/exercises`,

    GET_EXERCISES(queryParams?: GetExercisesProps): string {
      return addQueryParamsToUrl(this.base, queryParams);
    },

    GET_EXERCISE_BY_ID(id: string): string {
      return `${this.base}/${id}`;
    },

    GET_EXERCISES_BY_IDS(queryParams: { ids: string }): string {
      return addQueryParamsToUrl(`${this.base}-by-ids`, queryParams);
    },
  },

  HOME_GYM: {
    base: `${process.env.EXPO_PUBLIC_API_URL}/search-gyms`,

    SEARCH_GYMS(queryParams: FindHomeGymProps): string {
      return addQueryParamsToUrl(this.base, queryParams);
    },
  },
};

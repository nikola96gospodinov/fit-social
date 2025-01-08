import { addQueryParamsToUrl } from "@/src/utils/url.utils";
import { FindHomeGymProps } from "../services/home-gym/find-home-gym.service";

export const URL = {
  HOME_GYM: {
    base: `${process.env.EXPO_PUBLIC_API_URL}/search-gyms`,

    SEARCH_GYMS(queryParams: FindHomeGymProps): string {
      return addQueryParamsToUrl(this.base, queryParams);
    },
  },
};

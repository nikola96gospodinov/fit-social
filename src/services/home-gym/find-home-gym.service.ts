import { URL } from "@/src/constants/url.constants";
import { useQuery } from "@tanstack/react-query";

export type Gym = {
  id: string;
  primaryName: string;
  secondaryName: string;
};

export const HOME_GYM_QUERY_KEY = "home-gym";

export type FindHomeGymProps = {
  textQuery: string;
  latitude?: number;
  longitude?: number;
};

const findHomeGym = async ({
  textQuery,
  latitude,
  longitude,
}: FindHomeGymProps) => {
  const url = URL.HOME_GYM.SEARCH_GYMS({ textQuery, latitude, longitude });

  const response = await fetch(url, {
    method: "GET",
  });

  if (!response.ok) {
    console.error(await response.text());
    throw new Error("Failed to find home gym");
  }

  const data = await response.json();

  return data as Gym[];
};

export const useFindHomeGym = (props: FindHomeGymProps) => {
  return useQuery({
    queryKey: [HOME_GYM_QUERY_KEY, props],
    queryFn: () => findHomeGym(props),
    enabled: !!props.textQuery,
  });
};

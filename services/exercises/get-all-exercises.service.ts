import { URL } from "@/constants/url.constants";
import { Exercise } from "@/types/api/exercise.types";
import { useQuery } from "@tanstack/react-query";
import { EXERCISES_KEY } from "./exercise-keys";
import { headers } from "./headers";

export type GetExercisesProps = {
  limit?: number;
  offset?: number;
};

const getExercises = async (props?: GetExercisesProps) => {
  const url = URL.EXERCISE.GET_EXERCISES(props);

  const response = await fetch(url, {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    console.log(await response.text());

    throw new Error("Failed to fetch exercises");
  }

  const data: Exercise[] = await response.json();

  return data;
};

export const useGetExercises = (props?: GetExercisesProps) => {
  return useQuery({
    queryKey: [EXERCISES_KEY, props],
    queryFn: () => getExercises(props),
  });
};

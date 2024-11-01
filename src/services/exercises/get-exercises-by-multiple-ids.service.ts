import { URL } from "@/src/constants/url.constants";
import { Exercise } from "@/src/types/api/exercise.types";
import { useQuery } from "@tanstack/react-query";
import { EXERCISES_KEY } from "./exercise-keys";

const getExercisesByMultipleIds = async (ids: string[]) => {
  const url = URL.EXERCISE.GET_EXERCISES_BY_IDS({ ids: JSON.stringify(ids) });

  const response = await fetch(url, {
    method: "GET",
  });

  if (!response.ok) {
    console.error(await response.text());
    throw new Error("Failed to fetch exercises");
  }

  const data: Exercise[] = await response.json();

  return data;
};

export const useGetExercisesByMultipleIds = (ids?: string[]) => {
  return useQuery({
    queryKey: [EXERCISES_KEY, ids],
    queryFn: () => getExercisesByMultipleIds(ids ?? []),
    enabled: !!ids,
  });
};

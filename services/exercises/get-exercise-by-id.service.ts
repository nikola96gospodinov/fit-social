import { URL } from "@/constants/url.constants";
import { Exercise } from "@/types/api/exercise.types";
import { useQuery } from "@tanstack/react-query";
import { EXERCISES_KEY } from "./exercise-keys";

const getExerciseById = async (id: string) => {
  const url = URL.EXERCISE.GET_EXERCISE_BY_ID(id);

  const response = await fetch(url, {
    method: "GET",
  });

  if (!response.ok) {
    console.log(await response.text());

    throw new Error("Failed to fetch exercise");
  }

  const data: Exercise = await response.json();

  return data;
};

export const useGetExerciseById = (id: string) => {
  return useQuery({
    queryKey: [EXERCISES_KEY, id],
    queryFn: () => getExerciseById(id),
    staleTime: Number.POSITIVE_INFINITY,
  });
};

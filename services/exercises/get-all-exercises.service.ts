import { URL } from "@/constants/url.constants";
import { Exercise } from "@/types/api/exercise.types";
import { useQuery } from "@tanstack/react-query";
import { EXERCISES_KEY } from "./exercise-keys";
import { headers } from "./headers";
import { GetExercisesProps } from "./types";

const getExercises = async (props: GetExercisesProps) => {
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

export const useGetExercises = ({
  offset = 0,
  limit = 9999,
}: GetExercisesProps) => {
  return useQuery({
    queryKey: [EXERCISES_KEY, offset, limit],
    queryFn: () => getExercises({ offset, limit }),
  });
};

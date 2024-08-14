import { URL } from "@/constants/url.constants";
import { Exercise } from "@/types/api/exercise.types";
import { useQuery } from "@tanstack/react-query";

const EXERCISES_KEY = "exercises";

export type GetExercisesProps = {
  limit?: number;
  offset?: number;
};

const getExercises = async ({ limit = 9999, offset }: GetExercisesProps) => {
  const url = URL.EXERCISE.GET_EXERCISES({ limit, offset });

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "x-rapidapi-host": process.env.RAPID_API_HOST as string,
      "x-rapidapi-key": process.env.RAPID_API_KEY as string,
    },
  });

  if (!response.ok) {
    console.log(await response.text());

    throw new Error("Failed to fetch exercises");
  }

  const data: Exercise[] = await response.json();

  return data;
};

export const useGetExercises = (props: GetExercisesProps) => {
  return useQuery({
    queryKey: [EXERCISES_KEY, props],
    queryFn: () => getExercises(props),
  });
};

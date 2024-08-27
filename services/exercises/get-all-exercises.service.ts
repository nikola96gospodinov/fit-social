import { URL } from "@/constants/url.constants";
import { Exercise } from "@/types/api/exercise.types";
import { useQuery } from "@tanstack/react-query";
import { EXERCISES_KEY } from "./exercise-keys";
import {
  BodyPart,
  Equipment,
  TargetMuscle,
} from "@/constants/workout.constants";

export type GetExercisesProps = {
  query?: {
    limit?: number;
    offset?: number;
    search?: string;
  };
  body?: {
    targetFilters?: TargetMuscle[];
    bodyPartFilters?: BodyPart[];
    equipmentFilters?: Equipment[];
  };
};

const getExercises = async ({ query, body }: GetExercisesProps) => {
  const url = URL.EXERCISE.GET_EXERCISES(query);

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    console.log(await response.text());

    throw new Error("Failed to fetch exercises");
  }

  const data: Exercise[] = await response.json();

  return data;
};

export const useGetExercises = ({ query, body }: GetExercisesProps) => {
  return useQuery({
    queryKey: [EXERCISES_KEY, JSON.stringify(query), JSON.stringify(body)],
    queryFn: () => getExercises({ query, body }),
  });
};

import { URL } from "@/src/constants/url.constants";
import { ExerciseResponse } from "@/src/types/api/exercise.types";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { EXERCISES_KEY } from "./exercise-keys";
import {
  BodyPart,
  Equipment,
  TargetMuscle,
} from "@/src/constants/workout.constants";

export type GetExercisesProps = {
  limit?: number;
  offset?: number;
  search?: string;
  targetFilters?: TargetMuscle[];
  bodyPartFilters?: BodyPart[];
  equipmentFilters?: Equipment[];
};

const getExercises = async (props: GetExercisesProps) => {
  const url = URL.EXERCISE.GET_EXERCISES(props);

  const response = await fetch(url, {
    method: "GET",
  });

  if (!response.ok) {
    console.error(await response.text());

    throw new Error("Failed to fetch exercises");
  }

  const data: ExerciseResponse = await response.json();

  return data;
};

export const useGetExercises = (props: GetExercisesProps) => {
  return useQuery({
    queryKey: [EXERCISES_KEY, props],
    queryFn: () => getExercises(props),
    staleTime: Number.POSITIVE_INFINITY,
  });
};

export const useGetInfiniteExercises = (props: GetExercisesProps) => {
  return useInfiniteQuery({
    queryKey: [EXERCISES_KEY, props],
    queryFn: ({ pageParam }) => getExercises({ ...props, offset: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.offset + lastPage.limit < lastPage.total) {
        return lastPage.offset + lastPage.limit;
      }
    },
    staleTime: Number.POSITIVE_INFINITY,
  });
};

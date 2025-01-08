import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { EXERCISES_KEY } from "./exercise-keys";
import { supabase } from "@/src/lib/supabase";

export type GetExercisesProps = {
  limit?: number;
  offset?: number;
  search?: string;
  muscleGroupFilters?: string[];
  equipmentFilters?: string[];
};

const getExercises = async (props: GetExercisesProps) => {
  const { data, error } = await supabase.rpc("search_exercises", {
    search_query: props.search,
    p_muscle_groups: props.muscleGroupFilters,
    p_equipment: props.equipmentFilters,
    p_limit: props.limit,
    p_offset: props.offset,
  });

  if (error) {
    console.error("getExercises", error);
    throw new Error("Failed to fetch exercises");
  }

  return {
    data,
    total: data?.[0]?.total_count ?? 0,
    limit: props.limit ?? 25,
    offset: props.offset ?? 0,
  };
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

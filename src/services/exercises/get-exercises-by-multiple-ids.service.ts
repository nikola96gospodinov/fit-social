import { useQuery } from "@tanstack/react-query";
import { EXERCISES_KEY } from "./exercise-keys";
import { supabase } from "@/src/lib/supabase";

const getExercisesByMultipleIds = async (ids: string[]) => {
  const { data, error } = await supabase
    .from("exercises")
    .select("*, equipment(name), muscle_groups(name)")
    .in("id", ids);

  if (error) {
    console.error("getExercisesByMultipleIds", error);
    throw new Error("Failed to fetch exercises");
  }

  return data.map((exercise) => ({
    ...exercise,
    equipment_name: exercise.equipment?.name ?? "",
    muscle_group_name: exercise.muscle_groups?.name ?? "",
  }));
};

export const useGetExercisesByMultipleIds = (ids?: string[]) => {
  return useQuery({
    queryKey: [EXERCISES_KEY, ids],
    queryFn: () => getExercisesByMultipleIds(ids ?? []),
    enabled: !!ids,
  });
};

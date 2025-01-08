import { useQuery } from "@tanstack/react-query";
import { EXERCISES_KEY } from "./exercise-keys";
import { supabase } from "@/src/lib/supabase";

const getExerciseById = async (id: string) => {
  const { data, error } = await supabase
    .from("exercises")
    .select("*, equipment(name), muscle_groups(name)")
    .eq("id", id)
    .single();

  if (error) {
    console.error("getExerciseById", error);
    throw new Error("Failed to fetch exercise");
  }

  return {
    ...data,
    equipment_name: data.equipment?.name ?? "",
    muscle_group_name: data.muscle_groups?.name ?? "",
  };
};

export const useGetExerciseById = (id: string) => {
  return useQuery({
    queryKey: [EXERCISES_KEY, id],
    queryFn: () => getExerciseById(id),
    staleTime: Number.POSITIVE_INFINITY,
  });
};

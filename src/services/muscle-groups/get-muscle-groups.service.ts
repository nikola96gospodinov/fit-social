import { supabase } from "@/src/lib/supabase";
import { useQuery } from "@tanstack/react-query";

const GET_MUSCLE_GROUPS_QUERY_KEY = "getMuscleGroups";

const getMuscleGroups = async () => {
  const { data, error } = await supabase
    .from("muscle_groups")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    console.error("getMuscleGroups", error);
    throw new Error("Failed to fetch muscle groups");
  }

  return data;
};

export const useGetMuscleGroups = () => {
  return useQuery({
    queryKey: [GET_MUSCLE_GROUPS_QUERY_KEY],
    queryFn: () => getMuscleGroups(),
  });
};

import { supabase } from "@/src/lib/supabase";
import { useQuery } from "@tanstack/react-query";

const GET_EQUIPMENT_QUERY_KEY = "getEquipment";

const getEquipment = async () => {
  const { data, error } = await supabase
    .from("equipment")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    console.error("getEquipment", error);
    throw new Error("Failed to fetch equipment");
  }

  return data;
};

export const useGetEquipment = () => {
  return useQuery({
    queryKey: [GET_EQUIPMENT_QUERY_KEY],
    queryFn: () => getEquipment(),
  });
};

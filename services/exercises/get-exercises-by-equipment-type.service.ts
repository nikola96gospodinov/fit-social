import { Equipment } from "@/types/api/exercise.types";
import { headers } from "./headers";
import { URL } from "@/constants/url.constants";
import { Exercise } from "@/types/api/exercise.types";
import { useQuery } from "@tanstack/react-query";
import { EXERCISES_KEY } from "./exercise-keys";

const getExercisesByEquipmentType = async (equipmentType: Equipment) => {
  const url = URL.EXERCISE.GET_EXERCISES_BY_EQUIPMENT_TYPE(equipmentType);

  const response = await fetch(url, {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    console.log(await response.text());

    throw new Error("Failed to fetch exercises by equipment type");
  }

  const data: Exercise[] = await response.json();

  return data;
};

export const useGetExercisesByEquipmentType = (equipmentType: Equipment) => {
  return useQuery({
    queryKey: [EXERCISES_KEY, equipmentType],
    queryFn: () => getExercisesByEquipmentType(equipmentType),
  });
};

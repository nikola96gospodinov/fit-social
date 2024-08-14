import { Equipment } from "@/types/api/exercise.types";
import { headers } from "./headers";
import { URL } from "@/constants/url.constants";
import { Exercise } from "@/types/api/exercise.types";
import { useQuery } from "@tanstack/react-query";
import { EXERCISES_KEY } from "./exercise-keys";
import { GetExercisesProps } from "./types";

export type GetExercisesByEquipmentType = GetExercisesProps & {
  equipmentType: Equipment;
};

const getExercisesByEquipmentType = async (
  props: GetExercisesByEquipmentType
) => {
  const url = URL.EXERCISE.GET_EXERCISES_BY_EQUIPMENT_TYPE(props);

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

export const useGetExercisesByEquipmentType = ({
  equipmentType,
  offset = 0,
  limit = 9999,
}: GetExercisesByEquipmentType) => {
  return useQuery({
    queryKey: [EXERCISES_KEY, equipmentType, offset, limit],
    queryFn: () =>
      getExercisesByEquipmentType({ equipmentType, offset, limit }),
  });
};

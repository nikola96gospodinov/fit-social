import { TargetMuscle } from "@/types/api/exercise.types";
import { headers } from "./headers";
import { URL } from "@/constants/url.constants";
import { Exercise } from "@/types/api/exercise.types";
import { useQuery } from "@tanstack/react-query";
import { EXERCISES_KEY } from "./exercise-keys";
import { GetExercisesProps } from "./types";

export type GetExercisesByTargetMuscle = GetExercisesProps & {
  targetMuscle: TargetMuscle;
};

const getExercisesByTargetMuscle = async (
  props: GetExercisesByTargetMuscle
) => {
  const url = URL.EXERCISE.GET_EXERCISES_BY_TARGET_MUSCLE(props);

  const response = await fetch(url, {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    console.log(await response.text());

    throw new Error("Failed to fetch exercises by target muscle");
  }

  const data: Exercise[] = await response.json();

  return data;
};

export const useGetExercisesByTargetMuscle = ({
  targetMuscle,
  offset = 0,
  limit = 9999,
}: GetExercisesByTargetMuscle) => {
  return useQuery({
    queryKey: [EXERCISES_KEY, targetMuscle, offset, limit],
    queryFn: () => getExercisesByTargetMuscle({ targetMuscle, offset, limit }),
  });
};

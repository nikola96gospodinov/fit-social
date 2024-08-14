import { TargetMuscle } from "@/types/api/exercise.types";
import { headers } from "./headers";
import { URL } from "@/constants/url.constants";
import { Exercise } from "@/types/api/exercise.types";
import { useQuery } from "@tanstack/react-query";
import { EXERCISES_KEY } from "./exercise-keys";

const getExercisesByTargetMuscle = async (targetMuscle: TargetMuscle) => {
  const url = URL.EXERCISE.GET_EXERCISES_BY_TARGET_MUSCLE(targetMuscle);

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

export const useGetExercisesByTargetMuscle = (targetMuscle: TargetMuscle) => {
  return useQuery({
    queryKey: [EXERCISES_KEY, targetMuscle],
    queryFn: () => getExercisesByTargetMuscle(targetMuscle),
  });
};

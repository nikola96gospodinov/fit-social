import { BodyPart, Exercise } from "@/types/api/exercise.types";
import { headers } from "./headers";
import { URL } from "@/constants/url.constants";
import { useQuery } from "@tanstack/react-query";
import { EXERCISES_KEY } from "./exercise-keys";
import { GetExercisesProps } from "./types";

export type GetExercisesByBodyPartProps = GetExercisesProps & {
  bodyPart: BodyPart;
};

const getExerciseByBodyPart = async (props: GetExercisesByBodyPartProps) => {
  const url = URL.EXERCISE.GET_EXERCISES_BY_BODY_PART(props);

  const response = await fetch(url, {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    console.log(await response.text());

    throw new Error("Failed to fetch exercises by body part");
  }

  const data: Exercise[] = await response.json();

  return data;
};

export const useGetExercisesByBodyPart = ({
  bodyPart,
  offset = 0,
  limit = 9999,
}: GetExercisesByBodyPartProps) => {
  return useQuery({
    queryKey: [EXERCISES_KEY, bodyPart, offset, limit],
    queryFn: () => getExerciseByBodyPart({ bodyPart, offset, limit }),
  });
};

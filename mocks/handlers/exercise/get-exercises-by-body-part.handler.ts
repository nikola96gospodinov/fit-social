import { mockedExercises } from "./mocked-exercises";
import { URL } from "@/constants/url.constants";
import { http, HttpResponse, delay } from "msw";

export const getExercisesByBodyPartHandler = http.get(
  `${URL.EXERCISE.base}/bodyPart/:bodyPart`,
  async ({ params }) => {
    const { bodyPart } = params;
    const exercises = mockedExercises.filter(
      (exercise) => exercise.bodyPart === bodyPart
    );

    await delay(400);

    return HttpResponse.json(exercises, { status: 200 });
  }
);

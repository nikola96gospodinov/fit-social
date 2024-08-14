import { mockedExercises } from "./mocked-exercises";
import { URL } from "@/constants/url.constants";
import { http, HttpResponse, delay } from "msw";

export const getExercisesByTargetMuscleHandler = http.get(
  `${URL.EXERCISE.base}/target/:targetMuscle`,
  async ({ params }) => {
    const { targetMuscle } = params;
    const exercises = mockedExercises.filter(
      (exercise) => exercise.target === targetMuscle
    );

    await delay(400);

    return HttpResponse.json(exercises, { status: 200 });
  }
);

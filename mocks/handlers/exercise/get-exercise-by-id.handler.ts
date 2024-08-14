import { mockedExercises } from "./mocked-exercises";
import { URL } from "@/constants/url.constants";
import { http, HttpResponse, delay } from "msw";

export const getExerciseByIdHandler = http.get(
  `${URL.EXERCISE.base}/exercise/:id`,
  async ({ params }) => {
    const { id } = params;
    const exercise = mockedExercises.find((exercise) => exercise.id === id);

    await delay(100);

    return HttpResponse.json(exercise, { status: 200 });
  }
);

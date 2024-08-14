import { mockedExercises } from "./mocked-exercises";
import { URL } from "@/constants/url.constants";
import { http, HttpResponse, delay } from "msw";

export const getExerciseHandler = http.get(
  URL.EXERCISE.GET_EXERCISES(),
  async () => {
    await delay(1200);
    return HttpResponse.json(mockedExercises, { status: 200 });
  }
);

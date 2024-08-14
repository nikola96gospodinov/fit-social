import { mockedExercises } from "./mocked-exercises";
import { URL } from "@/constants/url.constants";
import { http, HttpResponse, delay } from "msw";

export const getExercisesByEquipmentTypeHandler = http.get(
  `${URL.EXERCISE.base}/equipment/:equipmentType`,
  async ({ params }) => {
    const { equipmentType } = params;
    const exercises = mockedExercises.filter(
      (exercise) => exercise.equipment === equipmentType
    );

    await delay(400);

    return HttpResponse.json(exercises, { status: 200 });
  }
);

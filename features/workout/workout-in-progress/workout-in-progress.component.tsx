import { useActiveWorkoutStore } from "@/store/active-workout-store";
import { View } from "react-native";
import { EmptyWorkout } from "./empty-workout/empty-workout.component";
import { isEmpty } from "lodash";

export const WorkoutInProgress = () => {
  const { exercises } = useActiveWorkoutStore();

  if (isEmpty(exercises)) {
    return <EmptyWorkout />;
  }

  return <View style={{ padding: 12 }}></View>;
};

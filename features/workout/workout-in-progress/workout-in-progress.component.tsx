import { useStore } from "@/store";
import { View } from "react-native";
import { EmptyWorkout } from "./empty-workout/empty-workout.component";

export const WorkoutInProgress = () => {
  const { workout } = useStore();

  if (!workout?.exercises) {
    return <EmptyWorkout />;
  }

  return <View style={{ padding: 12 }}></View>;
};

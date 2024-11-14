import { Pressable, useColorScheme } from "react-native";
import { router } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "@/src/constants/colors.constants";
import { Tables } from "@/src/types/database.types";
import { useActiveWorkoutStore } from "@/src/store/active-workout-store";
import { useGetWorkoutExercises } from "@/src/services/workout/get-workout-exercises.service";
import { useGetWorkoutSets } from "@/src/services/workout/get-workout-sets.service";

type Props = {
  workout: Tables<"workouts">;
};

export const EditWorkoutIcon = ({ workout }: Props) => {
  const theme = useColorScheme() ?? "light";

  const {
    store: { initiateState },
  } = useActiveWorkoutStore();

  const { data: exercises = [] } = useGetWorkoutExercises(workout.id);
  const { data: sets = [] } = useGetWorkoutSets(workout.id);

  const handlePress = () => {
    initiateState({
      started: new Date(workout.started),
      ended: new Date(workout.ended),
      exercises,
      sets,
      title: workout.title ?? "",
      id: workout.id,
    });

    router.push(`/profile/edit-workout/${workout.id}`);
  };

  return (
    <Pressable onPress={handlePress}>
      <FontAwesome name="pencil" size={16} color={colors[theme].icon} />
    </Pressable>
  );
};

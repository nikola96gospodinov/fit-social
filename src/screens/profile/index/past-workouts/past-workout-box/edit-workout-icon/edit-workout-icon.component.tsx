import { Pressable, useColorScheme } from "react-native";
import { router } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "@/src/constants/colors.constants";
import { Tables } from "@/src/types/database.types";
import { useActiveWorkoutStore } from "@/src/store/active-workout-store";
import { useGetWorkoutExercises } from "@/src/services/workout/get-workout-exercises.service";
import { useGetWorkoutSets } from "@/src/services/workout/get-workout-sets.service";
import { ThemedActivityIndicator } from "@/src/components/ui/themed-activity-indicator/themed-activity-indicator.component";

type Props = {
  workout: Tables<"workouts">;
};

export const EditWorkoutIcon = ({ workout }: Props) => {
  const theme = useColorScheme() ?? "light";

  const {
    store: { initiateState },
  } = useActiveWorkoutStore();

  const { data: exercises = [], isLoading: exercisesLoading } =
    useGetWorkoutExercises(workout.id);
  const { data: sets = [], isLoading: setsLoading } = useGetWorkoutSets(
    workout.id,
  );

  const isLoading = exercisesLoading || setsLoading;

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
    <Pressable onPress={handlePress} disabled={isLoading}>
      {isLoading ? (
        <ThemedActivityIndicator size="small" />
      ) : (
        <FontAwesome name="pencil" size={16} color={colors[theme].icon} />
      )}
    </Pressable>
  );
};

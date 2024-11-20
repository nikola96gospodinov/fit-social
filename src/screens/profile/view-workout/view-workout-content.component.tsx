import { FlatList, StyleSheet } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useGetWorkoutById } from "@/src/services/workout/get-workout-by-id.service";
import { useGetWorkoutExercises } from "@/src/services/workout/get-workout-exercises.service";
import { useGetAlternativeTitle } from "../index/past-workouts/past-workout-box/hooks/use-get-alternative-title";
import { useEffect } from "react";
import { ViewWorkoutListHeader } from "./list-header/list-header.component";
import { ExerciseWithSetsBox } from "./exercise-with-sets-box/exercise-with-sets-box.component";
import { spacing } from "@/src/constants/spacing.constants";

export const ViewWorkoutContent = () => {
  const { id } = useLocalSearchParams();

  const navigation = useNavigation();

  const { data: workout } = useGetWorkoutById(id as string);

  const { data: workoutExercises } = useGetWorkoutExercises(id as string);

  const alternativeTitle = useGetAlternativeTitle(
    workout?.ended ?? new Date().toISOString(),
    workoutExercises,
  );

  useEffect(() => {
    navigation.setOptions({
      title: alternativeTitle,
    });
  }, [alternativeTitle, navigation]);

  return (
    <FlatList
      keyExtractor={(item) => item.id}
      data={workoutExercises}
      contentContainerStyle={styles.contentContainer}
      renderItem={({ item, index }) => (
        <ExerciseWithSetsBox
          exercise={item}
          isLast={index === (workoutExercises?.length ?? 0) - 1}
        />
      )}
      ListHeaderComponent={ViewWorkoutListHeader}
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: spacing[4],
  },
});

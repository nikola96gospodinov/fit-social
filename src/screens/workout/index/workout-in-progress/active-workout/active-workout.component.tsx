import { spacing } from "@/src/constants/spacing.constants";
import { useActiveWorkoutStore } from "@/src/store/active-workout-store";
import { StyleSheet } from "react-native";
import { ActiveExercisesFooter } from "./active-exercises-footer/active-exercises-footer.component";
import { ActiveExerciseBox } from "./active-exercise-box/active-exercise-box.component";
import {
  NestableDraggableFlatList,
  NestableScrollContainer,
} from "react-native-draggable-flatlist";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export const ActiveWorkout = () => {
  const { exercises, setExercises } = useActiveWorkoutStore();

  return (
    <GestureHandlerRootView>
      <NestableScrollContainer style={styles.container}>
        <NestableDraggableFlatList
          data={exercises}
          keyExtractor={(item) => item.id}
          renderItem={({ item: exercise, drag, isActive }) => (
            <ActiveExerciseBox
              exercise={exercise}
              drag={drag}
              isActive={isActive}
            />
          )}
          ListFooterComponent={() => <ActiveExercisesFooter />}
          onDragEnd={({ data }) => setExercises(data)}
        />
      </NestableScrollContainer>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing[4],
    paddingBottom: 0,
  },
});

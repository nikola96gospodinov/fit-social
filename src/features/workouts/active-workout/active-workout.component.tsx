import { useActiveWorkoutStore } from "@/src/store/active-workout-store";
import { ActiveExercisesFooter } from "./active-exercises-footer/active-exercises-footer.component";
import { ActiveExerciseBox } from "./active-exercise-box/active-exercise-box.component";
import {
  NestableDraggableFlatList,
  NestableScrollContainer,
} from "react-native-draggable-flatlist";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ActiveExercisesHeader } from "./active-exercises-header/active-exercises-header.component";

export const ActiveWorkout = () => {
  const {
    store: { exercises, setExercises },
  } = useActiveWorkoutStore();

  return (
    <GestureHandlerRootView>
      <NestableScrollContainer>
        <NestableDraggableFlatList
          data={exercises}
          keyExtractor={(item) => item.exercise_id}
          renderItem={({ item: exercise, drag, isActive }) => (
            <ActiveExerciseBox
              exercise={exercise}
              drag={drag}
              isActive={isActive}
            />
          )}
          ListFooterComponent={ActiveExercisesFooter}
          ListHeaderComponent={ActiveExercisesHeader}
          onDragEnd={({ data }) => setExercises(data)}
        />
      </NestableScrollContainer>
    </GestureHandlerRootView>
  );
};

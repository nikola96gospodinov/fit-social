import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { ActiveExercise } from "@/src/types/workout.types";
import { View } from "react-native";
import { SetBox } from "./set-box/set-box.component";
import { NestableDraggableFlatList } from "react-native-draggable-flatlist";
import { useActiveWorkoutStore } from "@/src/store/active-workout-store";
import { SetsListHeader } from "./sets-list-header/sets-list-header.component";
import { isEmpty } from "lodash";

type Props = {
  exercise: ActiveExercise;
  isBoxActive: boolean;
};

export const Sets = ({ exercise, isBoxActive }: Props) => {
  const { setSets } = useActiveWorkoutStore();

  return (
    <View>
      {/* For some reason, when I pass this as a ListHeaderComponent, there is an error */}
      {!isEmpty(exercise.sets) && <SetsListHeader />}

      <NestableDraggableFlatList
        data={exercise.sets ?? []}
        keyExtractor={(item) => item.id}
        renderItem={({ item, drag, isActive }) => (
          <SetBox
            key={item.id}
            set={item}
            drag={drag}
            isActive={isActive}
            index={exercise.sets?.indexOf(item) ?? 0}
            exerciseId={exercise.id}
            isBoxActive={isBoxActive}
          />
        )}
        onDragEnd={({ data }) => setSets(exercise.id, data)}
        ListEmptyComponent={() => (
          <ThemedText type="small" color="supporting" isCentered>
            No sets added yet
          </ThemedText>
        )}
      />
    </View>
  );
};

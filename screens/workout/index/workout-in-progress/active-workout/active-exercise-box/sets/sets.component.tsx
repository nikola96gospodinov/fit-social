import { ThemedText } from "@/components/ui/themed-text/themed-text.component";
import { ActiveExercise } from "@/types/workout.types";
import { View } from "react-native";
import { SetBox } from "./set-box/set-box.component";
import { NestableDraggableFlatList } from "react-native-draggable-flatlist";
import { useActiveWorkoutStore } from "@/store/active-workout-store";
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
        ListHeaderComponent={isEmpty(exercise.sets) ? null : <SetsListHeader />}
        ListEmptyComponent={() => (
          <ThemedText type="small" color="supporting" isCentered>
            No sets added yet
          </ThemedText>
        )}
      />
    </View>
  );
};

import { ThemedText } from "@/components/ui/themed-text/themed-text.component";
import { ActiveExercise } from "@/types/workout.types";
import { isEmpty } from "lodash";
import { View } from "react-native";
import { SetBox } from "./set-box/set-box.component";
import { NestableDraggableFlatList } from "react-native-draggable-flatlist";
import { useActiveWorkoutStore } from "@/store/active-workout-store";
import { SetsListHeader } from "./sets-list-header/sets-list-header.component";

type Props = {
  exercise: ActiveExercise;
};

export const Sets = ({ exercise }: Props) => {
  const { setSets } = useActiveWorkoutStore();

  if (isEmpty(exercise.sets)) {
    return (
      <ThemedText type="small" color="supporting" isCentered>
        No sets added yet
      </ThemedText>
    );
  }

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
          />
        )}
        onDragEnd={({ data }) => setSets(exercise.id, data)}
        ListHeaderComponent={SetsListHeader}
      />
    </View>
  );
};

import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { View } from "react-native";
import { SetBox } from "./set-box/set-box.component";
import { NestableDraggableFlatList } from "react-native-draggable-flatlist";
import {
  ActiveExercise,
  useActiveWorkoutStore,
} from "@/src/store/active-workout-store";
import { SetsListHeader } from "./sets-list-header/sets-list-header.component";
import { isEmpty } from "lodash";
import { useGetPreviousSetsForExercise } from "@/src/services/workout/get-previous-sets-for-exercise.service";

type Props = {
  exercise: ActiveExercise;
  isBoxActive: boolean;
};

export const Sets = ({ exercise, isBoxActive }: Props) => {
  const {
    store: { setSets, getSetsForExercise },
  } = useActiveWorkoutStore();

  const sets = getSetsForExercise(exercise.id);

  const { data: previousSets } = useGetPreviousSetsForExercise(
    exercise.exercise_id,
  );

  return (
    <View>
      {/* For some reason, when I pass this as a ListHeaderComponent, there is an error */}
      {!isEmpty(sets) && (
        <SetsListHeader measurementType={exercise.measurement_type} />
      )}

      <NestableDraggableFlatList
        data={sets}
        keyExtractor={(item) => item.id}
        renderItem={({ item, drag, isActive, getIndex }) => {
          const index = getIndex() ?? 0;
          const isLast = index === sets.length - 1;

          return (
            <SetBox
              key={item.id}
              set={item}
              drag={drag}
              isActive={isActive}
              index={index}
              exercise={exercise}
              isBoxActive={isBoxActive}
              previousSet={previousSets?.[index]}
              isLast={isLast}
            />
          );
        }}
        onDragEnd={({ data }) => setSets(exercise.exercise_id, data)}
        ListEmptyComponent={() => (
          <ThemedText type="small" color="supporting" isCentered>
            No sets added yet
          </ThemedText>
        )}
      />
    </View>
  );
};

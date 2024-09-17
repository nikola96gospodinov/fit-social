import { ThemedText } from "@/components/ui/themed-text/themed-text.component";
import { ActiveExercise } from "@/types/workout.types";
import { isEmpty } from "lodash";
import { View, FlatList } from "react-native";
import { SetBox } from "./set-box/set-box.component";
import { VerticalSpacing } from "@/components/ui/layout/vertical-spacing/vertical-spacing.component";

type Props = {
  exercise: ActiveExercise;
};

export const Sets = ({ exercise }: Props) => {
  if (isEmpty(exercise.sets)) {
    return (
      <ThemedText type="small" color="supporting" isCentered>
        No sets added yet
      </ThemedText>
    );
  }

  return (
    <View>
      <FlatList
        data={exercise.sets}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <VerticalSpacing size={2} />}
        renderItem={({ item, index }) => (
          <SetBox
            key={item.id}
            set={item}
            index={index}
            exerciseId={exercise.id}
          />
        )}
      />
    </View>
  );
};

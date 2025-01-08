import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { PillWrapper } from "@/src/components/ui/pill/pill-wrapper.component";
import { Pill } from "@/src/components/ui/pill/pill.component";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { MUSCLE_GROUP } from "@/src/constants/workout.constants";
import { useGetMuscleGroups } from "@/src/services/muscle-groups/get-muscle-groups.service";
import {
  Filter,
  useExerciseFilterStore,
} from "@/src/store/exercise-filter-store";
import { isEqual } from "lodash";

export const MuscleGroupFilters = () => {
  const { filters, addFilter, removeFilter } = useExerciseFilterStore();

  const { data: muscleGroups } = useGetMuscleGroups();

  const onPillPress = (item: Filter, filter: Filter | undefined) => {
    if (filter) {
      removeFilter(filter);
    } else {
      addFilter(item);
    }
  };

  const pills = muscleGroups?.map((muscleGroup) => ({
    type: MUSCLE_GROUP,
    value: muscleGroup.name,
  }));

  return (
    <>
      <ThemedText type="subtitle">Muscle groups</ThemedText>

      <VerticalSpacing size={4} />

      <PillWrapper>
        {pills?.map((item) => {
          const filter = filters.find((f) => isEqual(f, item));

          return (
            <Pill
              key={item.value}
              label={item.value}
              isActive={!!filter}
              onPress={() => onPillPress(item, filter)}
            />
          );
        })}
      </PillWrapper>
    </>
  );
};

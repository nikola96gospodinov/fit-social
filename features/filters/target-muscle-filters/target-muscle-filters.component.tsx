import { VerticalSpacing } from "@/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { PillWrapper } from "@/components/ui/pill/pill-wrapper.component";
import { Pill } from "@/components/ui/pill/pill.component";
import { ThemedText } from "@/components/ui/themed-text/themed-text.component";
import {
  TARGET_MUSCLE,
  TargetMuscle,
  targetMuscles,
} from "@/constants/workout.constants";
import { useExerciseFilterStore, Filter } from "@/store/exercise-filter-store";

export const TargetMuscleFilters = () => {
  const { filters, addFilter, removeFilter } = useExerciseFilterStore();

  const onPillPress = (
    targetMuscle: TargetMuscle,
    filter: Filter | undefined,
  ) => {
    if (filter) {
      removeFilter(filter);
    } else {
      addFilter({ type: TARGET_MUSCLE, value: targetMuscle });
    }
  };

  return (
    <>
      <ThemedText type="subtitle">Target Muscles</ThemedText>

      <VerticalSpacing size={4} />

      <PillWrapper>
        {targetMuscles.map((targetMuscle) => {
          const filter = filters.find(
            (f) => f.type === TARGET_MUSCLE && f.value === targetMuscle,
          );

          return (
            <Pill
              key={targetMuscle}
              label={targetMuscle}
              isActive={!!filter}
              onPress={() => onPillPress(targetMuscle, filter)}
            />
          );
        })}
      </PillWrapper>
    </>
  );
};

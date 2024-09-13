import { VerticalSpacing } from "@/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { PillWrapper } from "@/components/ui/pill/pill-wrapper.component";
import { Pill } from "@/components/ui/pill/pill.component";
import { ThemedText } from "@/components/ui/themed-text/themed-text.component";
import { BODY_PART, BodyPart, bodyParts } from "@/constants/workout.constants";
import { Filter, useExerciseFilterStore } from "@/store/exercise-filter-store";

export const BodyPartFilters = () => {
  const { filters, addFilter, removeFilter } = useExerciseFilterStore();

  const onPillPress = (bodyPart: BodyPart, filter: Filter | undefined) => {
    if (filter) {
      removeFilter(filter);
    } else {
      addFilter({ type: BODY_PART, value: bodyPart });
    }
  };

  return (
    <>
      <ThemedText type="subtitle">Body parts</ThemedText>

      <VerticalSpacing size={4} />

      <PillWrapper>
        {bodyParts.map((bodyPart) => {
          const filter = filters.find(
            (f) => f.type === BODY_PART && f.value === bodyPart,
          );

          return (
            <Pill
              key={bodyPart}
              label={bodyPart}
              isActive={!!filter}
              onPress={() => onPillPress(bodyPart, filter)}
            />
          );
        })}
      </PillWrapper>
    </>
  );
};

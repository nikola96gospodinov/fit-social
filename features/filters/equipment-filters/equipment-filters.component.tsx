import { VerticalSpacing } from "@/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { PillWrapper } from "@/components/ui/pill/pill-wrapper.component";
import { Pill } from "@/components/ui/pill/pill.component";
import { ThemedText } from "@/components/ui/themed-text/themed-text.component";
import { EQUIPMENT, Equipment, equipment } from "@/constants/workout.constants";
import { Filter, useExerciseFilterStore } from "@/store/exercise-filter-store";

export const EquipmentFilters = () => {
  const { filters, addFilter, removeFilter } = useExerciseFilterStore();

  const onPillPress = (equipment: Equipment, filter: Filter | undefined) => {
    if (filter) {
      removeFilter(filter);
    } else {
      addFilter({ type: EQUIPMENT, value: equipment });
    }
  };

  return (
    <>
      <ThemedText type="subtitle">Equipment</ThemedText>

      <VerticalSpacing size={4} />

      <PillWrapper>
        {equipment.map((equipment) => {
          const filter = filters.find(
            (f) => f.type === EQUIPMENT && f.value === equipment,
          );

          return (
            <Pill
              key={equipment}
              label={equipment}
              isActive={!!filter}
              onPress={() => onPillPress(equipment, filter)}
            />
          );
        })}
      </PillWrapper>
    </>
  );
};

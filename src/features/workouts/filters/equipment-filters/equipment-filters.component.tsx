import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { PillWrapper } from "@/src/components/ui/pill/pill-wrapper.component";
import { Pill } from "@/src/components/ui/pill/pill.component";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { EQUIPMENT } from "@/src/constants/workout.constants";
import { useGetEquipment } from "@/src/services/equipment/get-equipment.service";
import {
  Filter,
  useExerciseFilterStore,
} from "@/src/store/exercise-filter-store";

export const EquipmentFilters = () => {
  const { filters, addFilter, removeFilter } = useExerciseFilterStore();

  const { data: equipment } = useGetEquipment();

  const onPillPress = (equipment: string, filter: Filter | undefined) => {
    if (filter) {
      removeFilter(filter);
    } else {
      addFilter({ type: EQUIPMENT, value: equipment });
    }
  };

  const pills = equipment?.map((equipment) => ({
    type: EQUIPMENT,
    value: equipment.name,
  }));

  return (
    <>
      <ThemedText type="subtitle">Equipment</ThemedText>

      <VerticalSpacing size={4} />

      <PillWrapper>
        {pills?.map((equipment) => {
          const filter = filters.find(
            (f) => f.type === EQUIPMENT && f.value === equipment.value,
          );

          return (
            <Pill
              key={equipment.value}
              label={equipment.value}
              isActive={!!filter}
              onPress={() => onPillPress(equipment.value, filter)}
            />
          );
        })}
      </PillWrapper>
    </>
  );
};

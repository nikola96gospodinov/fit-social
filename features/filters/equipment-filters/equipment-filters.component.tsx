import { VerticalSpacing } from "@/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { PillWrapper } from "@/components/ui/pill/pill-wrapper.component";
import { Pill } from "@/components/ui/pill/pill.component";
import { ThemedText } from "@/components/ui/themed-text/themed-text.component";
import { Equipment, equipment } from "@/constants/workout.constants";
import { useExerciseFilterStore } from "@/store/exercise-filter-store";

export const EquipmentFilters = () => {
  const { equipmentFilters, setEquipmentFilters } = useExerciseFilterStore();

  const onPillPress = (equipment: Equipment) => {
    if (equipmentFilters.includes(equipment)) {
      setEquipmentFilters(
        equipmentFilters.filter((equip) => equip !== equipment),
      );
    } else {
      setEquipmentFilters([...equipmentFilters, equipment]);
    }
  };

  return (
    <>
      <ThemedText type="subtitle">Equipment</ThemedText>

      <VerticalSpacing size={4} />

      <PillWrapper>
        {equipment.map((equipment) => (
          <Pill
            key={equipment}
            label={equipment}
            isActive={equipmentFilters.includes(equipment)}
            onPress={() => onPillPress(equipment)}
          />
        ))}
      </PillWrapper>
    </>
  );
};

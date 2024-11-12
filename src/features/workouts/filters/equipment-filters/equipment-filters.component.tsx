import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { PillWrapper } from "@/src/components/ui/pill/pill-wrapper.component";
import { Pill } from "@/src/components/ui/pill/pill.component";
import { ThemedButton } from "@/src/components/ui/themed-button/themed-button.component";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import {
  allEquipment,
  EQUIPMENT,
  Equipment,
  primaryEquipment,
  secondaryEquipment,
} from "@/src/constants/workout.constants";
import {
  Filter,
  useExerciseFilterStore,
} from "@/src/store/exercise-filter-store";
import { useState } from "react";
import { View } from "react-native";

export const EquipmentFilters = () => {
  const [showMore, setShowMore] = useState(false);

  const { filters, addFilter, removeFilter } = useExerciseFilterStore();

  const onPillPress = (equipment: Equipment, filter: Filter | undefined) => {
    if (filter) {
      removeFilter(filter);
    } else {
      addFilter({ type: EQUIPMENT, value: equipment });
    }
  };

  const activeSecondaryEquipment = secondaryEquipment.filter((equipment) =>
    filters.some((f) => f.type === EQUIPMENT && f.value === equipment),
  );

  const pills = showMore
    ? allEquipment
    : [...primaryEquipment, ...activeSecondaryEquipment];

  return (
    <>
      <ThemedText type="subtitle">Equipment</ThemedText>

      <VerticalSpacing size={4} />

      <PillWrapper>
        {pills.map((equipment) => {
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

      <VerticalSpacing size={2} />

      <View style={{ alignSelf: "flex-start" }}>
        <ThemedButton
          variant="flat"
          size="sm"
          text={showMore ? "Show less" : "Show more"}
          onPress={() => setShowMore(!showMore)}
        />
      </View>
    </>
  );
};

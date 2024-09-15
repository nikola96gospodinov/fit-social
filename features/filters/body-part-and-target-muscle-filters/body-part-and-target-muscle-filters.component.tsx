import { VerticalSpacing } from "@/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { PillWrapper } from "@/components/ui/pill/pill-wrapper.component";
import { Pill } from "@/components/ui/pill/pill.component";
import { ThemedButton } from "@/components/ui/themed-button/themed-button.component";
import { ThemedText } from "@/components/ui/themed-text/themed-text.component";
import {
  allBodyPartsAndTargetMuscles,
  primaryBodyPartsAndTargetMuscles,
} from "@/constants/workout.constants";
import { Filter, useExerciseFilterStore } from "@/store/exercise-filter-store";
import { isEqual } from "lodash";
import { useState } from "react";

export const BodyPartAndTargetMuscleFilters = () => {
  const [showMore, setShowMore] = useState(false);

  const { filters, addFilter, removeFilter } = useExerciseFilterStore();

  const onPillPress = (item: Filter, filter: Filter | undefined) => {
    if (filter) {
      removeFilter(filter);
    } else {
      addFilter(item);
    }
  };

  const pills = showMore
    ? allBodyPartsAndTargetMuscles
    : primaryBodyPartsAndTargetMuscles;

  return (
    <>
      <ThemedText type="subtitle">Body parts</ThemedText>

      <VerticalSpacing size={4} />

      <PillWrapper>
        {pills.map((item) => {
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

      <VerticalSpacing size={2} />

      <ThemedButton
        variant="flat"
        size="sm"
        text={showMore ? "Show less" : "Show more"}
        onPress={() => setShowMore(!showMore)}
      />
    </>
  );
};

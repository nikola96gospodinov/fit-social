import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { PillWrapper } from "@/src/components/ui/pill/pill-wrapper.component";
import { Pill } from "@/src/components/ui/pill/pill.component";
import { ThemedButton } from "@/src/components/ui/themed-button/themed-button.component";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import {
  allBodyPartsAndTargetMuscles,
  secondaryBodyPartsAndTargetMuscles,
  primaryBodyPartsAndTargetMuscles,
} from "@/src/constants/workout.constants";
import {
  Filter,
  useExerciseFilterStore,
} from "@/src/store/exercise-filter-store";
import { isEqual } from "lodash";
import { useState } from "react";
import { View } from "react-native";

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

  const activeSecondaryBodyPartsAndTargetMuscles =
    secondaryBodyPartsAndTargetMuscles.filter((filter) =>
      filters.some((f) => isEqual(f, filter)),
    );

  const pills = showMore
    ? allBodyPartsAndTargetMuscles
    : [
        ...primaryBodyPartsAndTargetMuscles,
        ...activeSecondaryBodyPartsAndTargetMuscles,
      ];

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

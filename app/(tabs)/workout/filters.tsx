import { PaddedScrollView } from "@/components/padded-scroll-view/padded-scroll-view.component";
import { VerticalSpacing } from "@/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { PillWrapper } from "@/components/ui/pill/pill-wrapper.component";
import { Pill } from "@/components/ui/pill/pill.component";
import { ThemedText } from "@/components/ui/themed-text.component";
import {
  BodyPart,
  bodyParts,
  Equipment,
  equipment,
  TargetMuscle,
  targetMuscles,
} from "@/constants/workout.constants";
import { useExerciseFilterStore } from "@/store/exercise-filter-store";

const Filters = () => {
  const { activeFilters, setActiveFilter } = useExerciseFilterStore();

  const onPillPress = (filter: BodyPart | Equipment | TargetMuscle) => {
    if (activeFilters.includes(filter)) {
      setActiveFilter(
        activeFilters.filter((activeFilter) => activeFilter !== filter)
      );
    } else {
      setActiveFilter([...activeFilters, filter]);
    }
  };

  return (
    <PaddedScrollView>
      <ThemedText type="subtitle">Body parts</ThemedText>

      <VerticalSpacing size={4} />

      <PillWrapper>
        {bodyParts.map((bodyPart) => (
          <Pill
            key={bodyPart}
            label={bodyPart}
            isActive={activeFilters.includes(bodyPart)}
            onPress={() => onPillPress(bodyPart)}
          />
        ))}
      </PillWrapper>

      <VerticalSpacing size={8} />

      <ThemedText type="subtitle">Target muscle</ThemedText>

      <VerticalSpacing size={4} />

      <PillWrapper>
        {targetMuscles.map((targetMuscle) => (
          <Pill
            key={targetMuscle}
            label={targetMuscle}
            isActive={activeFilters.includes(targetMuscle)}
            onPress={() => onPillPress(targetMuscle)}
          />
        ))}
      </PillWrapper>

      <VerticalSpacing size={8} />

      <ThemedText type="subtitle">Equipment</ThemedText>

      <VerticalSpacing size={4} />

      <PillWrapper>
        {equipment.map((equipment) => (
          <Pill
            key={equipment}
            label={equipment}
            isActive={activeFilters.includes(equipment)}
            onPress={() => onPillPress(equipment)}
          />
        ))}
      </PillWrapper>

      <VerticalSpacing size={8} />
    </PaddedScrollView>
  );
};

export default Filters;

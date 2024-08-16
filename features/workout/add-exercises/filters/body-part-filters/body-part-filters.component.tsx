import { VerticalSpacing } from "@/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { PillWrapper } from "@/components/ui/pill/pill-wrapper.component";
import { Pill } from "@/components/ui/pill/pill.component";
import { ThemedText } from "@/components/ui/themed-text.component";
import { BodyPart, bodyParts } from "@/constants/workout.constants";
import { useExerciseFilterStore } from "@/store/exercise-filter-store";

export const BodyPartFilters = () => {
  const { bodyPartFilters, setBodyPartFilters } = useExerciseFilterStore();

  const onPillPress = (bodyPart: BodyPart) => {
    if (bodyPartFilters.includes(bodyPart)) {
      setBodyPartFilters(bodyPartFilters.filter((part) => part !== bodyPart));
    } else {
      setBodyPartFilters([...bodyPartFilters, bodyPart]);
    }
  };

  return (
    <>
      <ThemedText type="subtitle">Body parts</ThemedText>

      <VerticalSpacing size={4} />

      <PillWrapper>
        {bodyParts.map((bodyPart) => (
          <Pill
            key={bodyPart}
            label={bodyPart}
            isActive={bodyPartFilters.includes(bodyPart)}
            onPress={() => onPillPress(bodyPart)}
          />
        ))}
      </PillWrapper>
    </>
  );
};

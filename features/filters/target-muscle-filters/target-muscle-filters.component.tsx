import { VerticalSpacing } from "@/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { PillWrapper } from "@/components/ui/pill/pill-wrapper.component";
import { Pill } from "@/components/ui/pill/pill.component";
import { ThemedText } from "@/components/ui/themed-text.component";
import { TargetMuscle, targetMuscles } from "@/constants/workout.constants";
import { useExerciseFilterStore } from "@/store/exercise-filter-store";

export const TargetMuscleFilters = () => {
  const { targetMuscleFilters, setTargetMuscleFilters } =
    useExerciseFilterStore();

  const onPillPress = (targetMuscle: TargetMuscle) => {
    if (targetMuscleFilters.includes(targetMuscle)) {
      setTargetMuscleFilters(
        targetMuscleFilters.filter((target) => target !== targetMuscle)
      );
    } else {
      setTargetMuscleFilters([...targetMuscleFilters, targetMuscle]);
    }
  };

  return (
    <>
      <ThemedText type="subtitle">Target Muscles</ThemedText>

      <VerticalSpacing size={4} />

      <PillWrapper>
        {targetMuscles.map((targetMuscle) => (
          <Pill
            key={targetMuscle}
            label={targetMuscle}
            isActive={targetMuscleFilters.includes(targetMuscle)}
            onPress={() => onPillPress(targetMuscle)}
          />
        ))}
      </PillWrapper>
    </>
  );
};

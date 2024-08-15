import { PaddedScrollView } from "@/components/padded-scroll-view/padded-scroll-view.component";
import { VerticalSpacing } from "@/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { PillWrapper } from "@/components/ui/pill/pill-wrapper.component";
import { Pill } from "@/components/ui/pill/pill.component";
import { ThemedText } from "@/components/ui/themed-text.component";
import {
  bodyParts,
  equipment,
  targetMuscles,
} from "@/constants/workout.constants";

const Filters = () => {
  return (
    <PaddedScrollView>
      <ThemedText type="subtitle">Body parts</ThemedText>

      <VerticalSpacing size={4} />

      <PillWrapper>
        {bodyParts.map((bodyPart) => (
          <Pill key={bodyPart} label={bodyPart} isActive={false} />
        ))}
      </PillWrapper>

      <VerticalSpacing size={8} />

      <ThemedText type="subtitle">Target muscle</ThemedText>

      <VerticalSpacing size={4} />

      <PillWrapper>
        {targetMuscles.map((targetMuscle) => (
          <Pill key={targetMuscle} label={targetMuscle} isActive={false} />
        ))}
      </PillWrapper>

      <VerticalSpacing size={8} />

      <ThemedText type="subtitle">Equipment</ThemedText>

      <VerticalSpacing size={4} />

      <PillWrapper>
        {equipment.map((equipment) => (
          <Pill key={equipment} label={equipment} isActive={false} />
        ))}
      </PillWrapper>
    </PaddedScrollView>
  );
};

export default Filters;

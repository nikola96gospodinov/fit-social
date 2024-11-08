import { Flex } from "@/src/components/ui/layout/flex/flex.component";
import { PaddedScrollView } from "@/src/components/ui/layout/padded-scroll-view/padded-scroll-view.component";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { Pill } from "@/src/components/ui/pill/pill.component";
import { ThemedActivityIndicator } from "@/src/components/ui/themed-activity-indicator/themed-activity-indicator.component";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { useGetExerciseById } from "@/src/services/exercises/get-exercise-by-id.service";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { capitalize } from "lodash";
import { useEffect } from "react";
import { Gif } from "./gif/gif.component";
import { Instructions } from "./instructions/instructions.component";
import { spacing } from "@/src/constants/spacing.constants";

export const ExerciseContent = () => {
  const { id } = useLocalSearchParams();

  const navigation = useNavigation();

  const { data: exercise, isLoading } = useGetExerciseById(String(id));

  useEffect(() => {
    if (exercise) {
      navigation.setOptions({
        title: `${capitalize(exercise.name)} (${exercise.bodyPart})`,
      });
    }

    if (!isLoading && !exercise) {
      navigation.setOptions({ title: "Exercise not found" });
    }
  }, [exercise, isLoading, navigation]);

  if (isLoading) {
    return <ThemedActivityIndicator padding={4} />;
  }

  if (!exercise) {
    return (
      <ThemedText style={{ paddingTop: spacing[4] }}>
        Exercise not found
      </ThemedText>
    );
  }

  return (
    <PaddedScrollView>
      <Gif exercise={exercise} />

      <VerticalSpacing size={4} />

      <Flex direction="row" gap={2} align="center">
        <Pill label={exercise.target} isActive />

        {exercise.secondaryMuscles.map((muscle) => (
          <Pill key={muscle} label={muscle} isActive={false} />
        ))}
      </Flex>

      <VerticalSpacing size={6} />

      <Instructions exercise={exercise} />

      <VerticalSpacing size={10} />
    </PaddedScrollView>
  );
};

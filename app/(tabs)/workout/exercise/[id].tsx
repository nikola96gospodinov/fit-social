import { PaddedScrollView } from "@/components/padded-scroll-view/padded-scroll-view.component";
import { ThemedActivityIndicator } from "@/components/ui/themed-activity-indicator/themed-activity-indicator.component";
import { ThemedText } from "@/components/ui/themed-text/themed-text.component";
import { useGetExerciseById } from "@/services/exercises/get-exercise-by-id.service";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { capitalize } from "lodash";
import { useEffect } from "react";

const Exercise = () => {
  const { id } = useLocalSearchParams();

  const navigation = useNavigation();

  const { data: exercise, isLoading } = useGetExerciseById(String(id));

  useEffect(() => {
    navigation.setOptions({ title: capitalize(exercise?.name) });
  }, [exercise?.name, navigation]);

  if (isLoading) {
    return <ThemedActivityIndicator />;
  }

  return (
    <PaddedScrollView>
      <ThemedText>{exercise?.name}</ThemedText>
    </PaddedScrollView>
  );
};

export default Exercise;

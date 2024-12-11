import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { useGetNumberOfLikesForWorkout } from "@/src/services/likes/get-number-of-likes-for-workout.service";
import { Href, router, useSegments } from "expo-router";
import { Pressable } from "react-native";

type Props = {
  workoutId: string;
};

export const Likes = ({ workoutId }: Props) => {
  const { data: count } = useGetNumberOfLikesForWorkout(workoutId);

  const segments = useSegments();
  const tab = segments[1] || "(index)";

  if (!count) return null;

  return (
    <Pressable
      onPress={() => router.push(`/${tab}/workout-likes/${workoutId}` as Href)}>
      <VerticalSpacing size={2} />

      <ThemedText type="extraSmall">
        {count} {count === 1 ? "person" : "people"} liked this
      </ThemedText>
    </Pressable>
  );
};

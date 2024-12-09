import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { useGetLikesForWorkout } from "@/src/services/likes/get-likes-for-workout.service";
import { Href, router, useSegments } from "expo-router";
import { Pressable } from "react-native";

type Props = {
  workoutId: string;
};

export const Likes = ({ workoutId }: Props) => {
  const { data } = useGetLikesForWorkout(workoutId);

  const segments = useSegments();
  const tab = segments[1] || "(index)";

  if (!data || data.length === 0) return null;

  return (
    <Pressable
      onPress={() => router.push(`/${tab}/workout-likes/${workoutId}` as Href)}>
      <VerticalSpacing size={2} />

      <ThemedText type="extraSmall">
        {data.length} {data.length === 1 ? "person" : "people"} liked this
      </ThemedText>
    </Pressable>
  );
};

import { colors, red } from "@/src/constants/colors.constants";
import { useLikeWorkout } from "@/src/services/likes/like-workout.service";
import { useIsWorkoutLiked } from "@/src/services/likes/is-workout-liked.service";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Pressable, useColorScheme } from "react-native";
import { useUnlikeWorkout } from "@/src/services/likes/unlike-workout.service";

type Props = {
  workoutId: string;
};

export const LikeAction = ({ workoutId }: Props) => {
  const theme = useColorScheme() ?? "light";

  const { mutate: likeWorkout, isPending } = useLikeWorkout();

  const { mutate: unlikeWorkout } = useUnlikeWorkout();

  const { data: isWorkoutLiked } = useIsWorkoutLiked(workoutId);

  if (isWorkoutLiked) {
    return (
      <Pressable onPress={() => unlikeWorkout(workoutId)} disabled={isPending}>
        <FontAwesome name="heart" size={20} color={red[600]} />
      </Pressable>
    );
  }

  return (
    <Pressable onPress={() => likeWorkout(workoutId)} disabled={isPending}>
      <FontAwesome name="heart-o" size={20} color={colors[theme].icon} />
    </Pressable>
  );
};

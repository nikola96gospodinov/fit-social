import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { Actions } from "../../actions/actions.component";
import { useLocalSearchParams } from "expo-router";
import { Likes } from "../../likes/likes.component";

export const ListFooter = () => {
  const { id } = useLocalSearchParams();

  return (
    <>
      <VerticalSpacing size={4} />

      <Actions workoutId={id as string} />

      <Likes workoutId={id as string} />
    </>
  );
};

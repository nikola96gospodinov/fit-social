import { Flex } from "@/src/components/ui/layout/flex/flex.component";
import { LikeAction } from "./like-action/like-action.component";
import { CommentAction } from "./comment-action/comment-action.component";

type Props = {
  workoutId: string;
};

export const Actions = ({ workoutId }: Props) => {
  return (
    <Flex direction="row" gap={4} align="center">
      <LikeAction workoutId={workoutId} />

      <CommentAction workoutId={workoutId} />
    </Flex>
  );
};

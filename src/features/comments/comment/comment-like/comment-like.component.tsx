import { Flex } from "@/src/components/ui/layout/flex/flex.component";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { colors, red } from "@/src/constants/colors.constants";
import { useGetNumberOfCommentLikes } from "@/src/services/comments/get-number-of-comment-likes.service";
import { useIsCommentLiked } from "@/src/services/comments/is-comment-liked.service";
import { useLikeComment } from "@/src/services/comments/like-comment.service";
import { useUnlikeComment } from "@/src/services/comments/unlike-comment.service";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Pressable, useColorScheme } from "react-native";

type Props = {
  commentId: string;
};

export const CommentLike = ({ commentId }: Props) => {
  const { data: numberOfLikes } = useGetNumberOfCommentLikes(commentId);

  const showNumberOfLikes = numberOfLikes && numberOfLikes > 0;

  return (
    <Flex align="center">
      <HeartIcon commentId={commentId} />

      {!!showNumberOfLikes && (
        <>
          <VerticalSpacing size={2} />

          <ThemedText type="extraSmall" color="supporting">
            {numberOfLikes}
          </ThemedText>
        </>
      )}
    </Flex>
  );
};

const HeartIcon = ({ commentId }: { commentId: string }) => {
  const theme = useColorScheme() ?? "light";

  const { data: isLiked } = useIsCommentLiked(commentId);

  const { mutate: likeComment } = useLikeComment();
  const { mutate: unlikeComment } = useUnlikeComment();

  if (isLiked) {
    return (
      <Pressable onPress={() => unlikeComment(commentId)}>
        <FontAwesome name="heart" size={16} color={red[600]} />
      </Pressable>
    );
  }

  return (
    <Pressable onPress={() => likeComment(commentId)}>
      <FontAwesome name="heart-o" size={16} color={colors[theme].icon} />
    </Pressable>
  );
};

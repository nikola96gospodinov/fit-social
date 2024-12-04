import { useLocalSearchParams } from "expo-router";
import { useGetComments } from "@/src/services/comments/get-comments.service";
import { FlashList } from "@shopify/flash-list";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { StyleSheet } from "react-native";
import { spacing } from "@/src/constants/spacing.constants";
import { EmptyListComments } from "./empty-list-comments/empty-list-comments.component";
import { AddCommentInput } from "./add-coment-input/add-comment-input.component";
import { Comment } from "./comment/comment.component";
export const CommentsContent = () => {
  const { id } = useLocalSearchParams();

  const {
    data: comments,
    isLoading,
    isError,
    refetch,
  } = useGetComments(id as string);

  return (
    <>
      <FlashList
        data={comments}
        renderItem={({ item }) => <Comment comment={item} />}
        estimatedItemSize={100}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <VerticalSpacing size={5} />}
        contentContainerStyle={styles.container}
        ListEmptyComponent={
          <EmptyListComments
            isError={isError}
            refetch={refetch}
            isLoading={isLoading}
          />
        }
      />

      <AddCommentInput workoutId={id as string} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing[4],
  },
});

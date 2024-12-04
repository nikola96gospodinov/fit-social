import { ThemedTextInput } from "@/src/components/ui/form/themed-text-input/themed-text-input.component";
import { spacing } from "@/src/constants/spacing.constants";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { ThemedButton } from "@/src/components/ui/themed-button/themed-button.component";
import { useState } from "react";
import { useAddComment } from "@/src/services/comments/add-comment.service";

type Props = {
  workoutId: string;
};

export const AddCommentInput = ({ workoutId }: Props) => {
  const insets = useSafeAreaInsets();
  const height = useHeaderHeight();

  const [comment, setComment] = useState("");
  const { mutate: addComment, isPending } = useAddComment();

  const onAddComment = () => {
    addComment({ comment, workoutId }, { onSuccess: () => setComment("") });
  };

  const marginBottom =
    Platform.OS === "ios" ? insets.bottom : insets.bottom + spacing[4];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={height + spacing[11] + insets.bottom}
      style={[styles.container, { marginBottom }]}>
      <View style={{ flex: 1 }}>
        <ThemedTextInput
          placeholder="Add a comment"
          value={comment}
          onChangeText={setComment}
        />
      </View>

      <ThemedButton
        text="Add"
        isRounded
        size="sm"
        onPress={onAddComment}
        isLoading={isPending}
        disabled={!comment || isPending}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing[4],
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing[2],
  },
});

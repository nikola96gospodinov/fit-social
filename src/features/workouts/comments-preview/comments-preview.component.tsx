import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { useGetComments } from "@/src/services/comments/get-comments.service";
import { router, usePathname } from "expo-router";
import { Pressable } from "react-native";

type Props = {
  workoutId: string;
};

export const CommentsPreview = ({ workoutId }: Props) => {
  const { data: comments } = useGetComments(workoutId);

  const pathname = usePathname();
  const tab = pathname.includes("profile") ? "profile" : "(index)";

  return (
    <>
      <VerticalSpacing size={2} />

      <Pressable
        onPress={() => router.push(`/${tab}/add-comment/${workoutId}`)}>
        {!!comments?.length && (
          <>
            <ThemedText type="extraSmall" color="supporting" numberOfLines={2}>
              <ThemedText type="extraSmall" style={{ fontWeight: "700" }}>
                @{comments[0].profiles?.handle}
              </ThemedText>
              {"  "}
              {comments[0].content}
            </ThemedText>

            <VerticalSpacing size={1} />
          </>
        )}

        <ThemedText type="extraSmall" color="supporting">
          {comments?.length ? "See comments" : "Add a comment"}
        </ThemedText>
      </Pressable>
    </>
  );
};

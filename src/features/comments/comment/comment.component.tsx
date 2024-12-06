import { Avatar } from "@/src/components/avatar/avatar.component";
import { Flex } from "@/src/components/ui/layout/flex/flex.component";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { Tables } from "@/src/types/database.types";
import { getDistance } from "@/src/utils/dates.utils";
import { Pressable, View } from "react-native";
import { CommentLike } from "./comment-like/comment-like.component";
import { router } from "expo-router";
import { useGetProfileHref } from "@/src/hooks/use-get-profile-href";

type Props = {
  comment: Tables<"comments"> & { profiles: Tables<"profiles"> | null };
};

export const Comment = ({ comment }: Props) => {
  const distance = getDistance(comment.created_at);

  const profileHref = useGetProfileHref(comment.profiles?.id);

  const onPressProfile = () => {
    router.back();
    router.push(profileHref);
  };

  return (
    <Flex justify="space-between" direction="row" gap={3}>
      <Flex gap={3} direction="row" style={{ flex: 1 }}>
        <Pressable onPress={onPressProfile}>
          <Avatar size={24} userId={comment.profiles?.id} />
        </Pressable>

        <View style={{ flex: 1 }}>
          <Flex direction="row" gap={2}>
            <Pressable onPress={onPressProfile}>
              <ThemedText type="extraSmall">
                @{comment.profiles?.handle}
              </ThemedText>
            </Pressable>

            <ThemedText type="extraSmall" color="supporting">
              {distance}
            </ThemedText>
          </Flex>

          <VerticalSpacing size={0.5} />

          <ThemedText type="small">{comment.content}</ThemedText>
        </View>
      </Flex>

      <CommentLike commentId={comment.id} />
    </Flex>
  );
};

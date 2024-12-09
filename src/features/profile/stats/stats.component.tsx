import { Flex } from "@/src/components/ui/layout/flex/flex.component";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { useGetSession } from "@/src/services/auth/get-session.service";
import { useGetFollowers } from "@/src/services/follows/get-followers.service";
import { useGetFollowing } from "@/src/services/follows/get-following.service";
import { Href, router, useSegments } from "expo-router";
import { Pressable, StyleSheet } from "react-native";

type Props = {
  userId?: string;
};

export const Stats = ({ userId }: Props) => {
  const { data: following } = useGetFollowing(userId);
  const { data: followers } = useGetFollowers(userId);

  const { data: session } = useGetSession();

  const segments = useSegments();
  const tab = segments[1] || "(index)";

  const isOwnProfile = session?.user.id === userId;

  const href = (() => {
    if (isOwnProfile || !userId) return "/profile/follows";
    return `/${tab}/follows/${userId}`;
  })() as Href;

  return (
    <Pressable onPress={() => router.push(href)}>
      <Flex direction="row" gap={2}>
        <Flex direction="row" gap={1}>
          <ThemedText type="extraSmall" style={styles.countText}>
            {followers?.length ?? 0}
          </ThemedText>
          <ThemedText type="extraSmall">Followers</ThemedText>
        </Flex>

        <Flex direction="row" gap={1}>
          <ThemedText type="extraSmall" style={styles.countText}>
            {following?.length ?? 0}
          </ThemedText>
          <ThemedText type="extraSmall">Following</ThemedText>
        </Flex>
      </Flex>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  countText: {
    fontWeight: "bold",
  },
});

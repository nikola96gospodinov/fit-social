import { Flex } from "@/src/components/ui/layout/flex/flex.component";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { useGetSession } from "@/src/services/auth/get-session.service";
import { useGetNumberOfFollowers } from "@/src/services/follows/get-number-of-followers.service";
import { Href, router, useSegments } from "expo-router";
import { Pressable, StyleSheet } from "react-native";
import { useGetNumberOfFollowing } from "@/src/services/follows/get-number-of-following.service";

type Props = {
  userId?: string;
};

export const Stats = ({ userId }: Props) => {
  const { data: followingCount } = useGetNumberOfFollowing(userId);
  const { data: followersCount } = useGetNumberOfFollowers(userId);

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
            {followersCount ?? 0}
          </ThemedText>
          <ThemedText type="extraSmall">Followers</ThemedText>
        </Flex>

        <Flex direction="row" gap={1}>
          <ThemedText type="extraSmall" style={styles.countText}>
            {followingCount ?? 0}
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

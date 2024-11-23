import { Flex } from "@/src/components/ui/layout/flex/flex.component";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { spacing } from "@/src/constants/spacing.constants";
import { useGetFollowers } from "@/src/services/follows/get-followers.service";
import { useGetFollowing } from "@/src/services/follows/get-following.service";
import { router } from "expo-router";
import { Pressable, StyleSheet } from "react-native";

export const Stats = () => {
  const { data: following } = useGetFollowing();
  const { data: followers } = useGetFollowers();

  return (
    <Pressable onPress={() => router.push("/profile/follows")}>
      <Flex direction="row" gap={2} style={styles.container}>
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
  container: {
    paddingHorizontal: spacing[4],
  },

  countText: {
    fontWeight: "bold",
  },
});

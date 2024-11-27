import { Avatar } from "@/src/components/avatar/avater.component";
import { Flex } from "@/src/components/ui/layout/flex/flex.component";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { FollowButton } from "@/src/features/follows/follow-button/follow-button.component";
import { Tables } from "@/src/types/database.types";
import { View } from "react-native";

type Props = {
  follow: Tables<"follows"> & { profiles: Tables<"profiles"> | null };
};

export const FollowBox = ({ follow }: Props) => {
  return (
    <Flex align="center" justify="space-between" direction="row">
      <Flex align="center" justify="center" direction="row" gap={3}>
        <Avatar
          size={32}
          handle={follow.profiles?.handle}
          avatarUrl={follow.profiles?.avatar_url}
        />

        <View>
          <ThemedText type="small">@{follow.profiles?.handle}</ThemedText>

          {follow.profiles?.full_name && (
            <>
              <VerticalSpacing size={0.5} />

              <ThemedText type="extraSmall" color="supporting">
                {follow.profiles?.full_name}
              </ThemedText>
            </>
          )}
        </View>
      </Flex>

      <FollowButton profileToFollow={follow.profiles!} />
    </Flex>
  );
};

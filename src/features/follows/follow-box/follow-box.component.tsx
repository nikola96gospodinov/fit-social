import { Avatar } from "@/src/components/avatar/avatar.component";
import { Flex } from "@/src/components/ui/layout/flex/flex.component";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { FollowButton } from "@/src/features/follows/follow-button/follow-button.component";
import { Tables } from "@/src/types/database.types";
import { View } from "react-native";

type Props = {
  profile: Tables<"profiles"> & { search_rank?: number };
};

export const FollowBox = ({ profile }: Props) => {
  return (
    <Flex align="flex-end" justify="space-between" direction="row">
      <Flex align="center" justify="center" direction="row" gap={3}>
        <Avatar size={32} userId={profile.id} />

        <View>
          <ThemedText type="small">@{profile.handle}</ThemedText>

          {profile.full_name && (
            <>
              <VerticalSpacing size={0.5} />

              <ThemedText type="extraSmall" color="supporting">
                {profile.full_name}
              </ThemedText>
            </>
          )}
        </View>
      </Flex>

      <View>
        <FollowButton profileToFollow={profile} />
      </View>
    </Flex>
  );
};

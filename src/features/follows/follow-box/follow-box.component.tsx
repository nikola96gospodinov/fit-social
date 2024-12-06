import { Avatar } from "@/src/components/avatar/avatar.component";
import { Flex } from "@/src/components/ui/layout/flex/flex.component";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { FollowButton } from "@/src/features/follows/follow-button/follow-button.component";
import { useGetProfileHref } from "@/src/hooks/use-get-profile-href";
import { useGetSession } from "@/src/services/auth/get-session.service";
import { Tables } from "@/src/types/database.types";
import { router } from "expo-router";
import { Pressable, View } from "react-native";

type Props = {
  profile: Tables<"profiles"> & { search_rank?: number };
};

export const FollowBox = ({ profile }: Props) => {
  const { data: session } = useGetSession();
  const isYourProfile = session?.user.id === profile.id;

  const profileHref = useGetProfileHref(profile.id);

  return (
    <Flex align="flex-end" justify="space-between" direction="row">
      <Pressable
        onPress={() => {
          router.back();
          router.push(profileHref);
        }}>
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
      </Pressable>

      {!isYourProfile && (
        <View>
          <FollowButton profileToFollow={profile} />
        </View>
      )}
    </Flex>
  );
};

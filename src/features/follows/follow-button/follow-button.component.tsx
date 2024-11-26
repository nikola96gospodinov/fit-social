import { ThemedButton } from "@/src/components/ui/themed-button/themed-button.component";
import { useFollowAccount } from "@/src/services/follows/follow-account.service";
import { useIsAccountFollowed } from "@/src/services/follows/is-account-followed.service";
import { useUnfollowAccount } from "@/src/services/follows/unfollow-account.service";
import { Tables } from "@/src/types/database.types";

type Props = {
  profileToFollow: Tables<"profiles">;
};

export const FollowButton = ({ profileToFollow }: Props) => {
  const { mutate: followAccount, isPending: isFollowing } = useFollowAccount(
    profileToFollow.id,
  );

  const { mutate: unfollowAccount, isPending: isUnfollowing } =
    useUnfollowAccount(profileToFollow.id);

  const { data: isAccountFollowed, isLoading: isAccountFollowedLoading } =
    useIsAccountFollowed(profileToFollow.id);

  const isLoading = isFollowing || isAccountFollowedLoading || isUnfollowing;

  const onPress = () => {
    if (isAccountFollowed) {
      unfollowAccount(profileToFollow.id);
    } else {
      followAccount(profileToFollow);
    }
  };

  return (
    <ThemedButton
      text={isAccountFollowed ? "Following" : "Follow"}
      onPress={onPress}
      isLoading={isLoading}
      disabled={isLoading}
      size="xs"
      isRounded
      variant={isAccountFollowed ? "outline" : "primary"}
      icon={isAccountFollowed ? "check" : undefined}
    />
  );
};

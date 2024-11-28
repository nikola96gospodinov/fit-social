import { ThemedButton } from "@/src/components/ui/themed-button/themed-button.component";
import { useFollowAccount } from "@/src/services/follows/follow-account.service";
import { useIsAccountFollowed } from "@/src/services/follows/is-account-followed.service";
import { useUnfollowAccount } from "@/src/services/follows/unfollow-account.service";
import { Tables } from "@/src/types/database.types";

type Props = {
  profileToFollow: Tables<"profiles"> & {
    search_rank?: number;
  };
};

export const FollowButton = ({ profileToFollow }: Props) => {
  const { mutate: followAccount } = useFollowAccount(profileToFollow.id);

  const { mutate: unfollowAccount } = useUnfollowAccount(profileToFollow.id);

  const { data: isAccountFollowed } = useIsAccountFollowed(profileToFollow.id);

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
      size="xs"
      isRounded
      variant={isAccountFollowed ? "outline" : "primary"}
      icon={isAccountFollowed ? "check" : undefined}
    />
  );
};

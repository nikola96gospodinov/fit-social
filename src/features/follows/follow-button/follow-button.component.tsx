import { ThemedButton } from "@/src/components/ui/themed-button/themed-button.component";
import { Size } from "@/src/components/ui/themed-button/themed-button.types";
import { useFollowAccount } from "@/src/services/follows/follow-account.service";
import { useGetFollowStatus } from "@/src/services/follows/get-follow-status.service";
import { useUnfollowAccount } from "@/src/services/follows/unfollow-account.service";
import { Tables } from "@/src/types/database.types";
import { isUndefined } from "lodash";

type Props = {
  profileToFollow: Tables<"profiles"> & {
    search_rank?: number;
  };
  size?: Size;
  isFullWidth?: boolean;
};

export const FollowButton = ({
  profileToFollow,
  size = "xs",
  isFullWidth = false,
}: Props) => {
  const { mutate: followAccount } = useFollowAccount(profileToFollow.id);

  const { mutate: unfollowAccount } = useUnfollowAccount(profileToFollow.id);

  const { data: followStatus } = useGetFollowStatus({
    followedId: profileToFollow.id,
  });

  const onPress = () => {
    if (followStatus) {
      unfollowAccount(profileToFollow.id);
    } else {
      followAccount(profileToFollow);
    }
  };

  const buttonText = (() => {
    if (followStatus === "pending") return "Pending";
    if (followStatus === "accepted") return "Following";
    return "Follow";
  })();

  const buttonIcon = (() => {
    if (followStatus === "pending") return "clock-o";
    if (followStatus === "accepted") return "check";
    return undefined;
  })();

  const variant = (() => {
    if (followStatus === "pending") return "outline";
    if (followStatus === "accepted") return "outline";
    return "primary";
  })();

  return (
    <ThemedButton
      text={buttonText}
      onPress={onPress}
      size={size}
      isRounded
      variant={variant}
      icon={buttonIcon}
      isFullWidth={isFullWidth}
      isLoading={isUndefined(followStatus)}
      disabled={isUndefined(followStatus)}
    />
  );
};

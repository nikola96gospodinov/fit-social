import { ThemedButton } from "@/src/components/ui/themed-button/themed-button.component";
import { useAcceptFollowRequest } from "@/src/services/follows/accept-follow-request.service";

type Props = {
  followerId: string;
};

export const AcceptButton = ({ followerId }: Props) => {
  const { mutate: acceptFollowRequest } = useAcceptFollowRequest();

  return (
    <ThemedButton
      text="Accept"
      onPress={() => acceptFollowRequest(followerId)}
      isRounded
      size="xs"
    />
  );
};

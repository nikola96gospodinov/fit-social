import { NetworkError } from "../network-error/network-error.component";
import { FullScreenCenteredView } from "@/src/components/ui/layout/full-screen-centered-view/full-screen-centered-view.component";

type Props = {
  message?: string;
  refetch?: (...args: any) => void;
};

export const FullScreenError = ({ message, refetch }: Props) => {
  return (
    <FullScreenCenteredView>
      <NetworkError message={message} refetch={refetch} />
    </FullScreenCenteredView>
  );
};

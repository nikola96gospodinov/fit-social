import { NetworkError } from "@/src/components/error/network-error/network-error.component";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ThemedActivityIndicator } from "@/src/components/ui/themed-activity-indicator/themed-activity-indicator.component";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";

type Props = {
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
  count: number | undefined | null;
};

export const LikesFooter = ({ isLoading, isError, refetch, count }: Props) => {
  if (isLoading) {
    return (
      <>
        <VerticalSpacing size={4} />

        <ThemedActivityIndicator />
      </>
    );
  }

  if (isError) {
    return (
      <>
        <VerticalSpacing size={4} />

        <NetworkError refetch={refetch} />
      </>
    );
  }

  if (count === 0) {
    return (
      <>
        <VerticalSpacing size={4} />

        <ThemedText style={{ textAlign: "center" }}>No likes</ThemedText>
      </>
    );
  }

  return null;
};

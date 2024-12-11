import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { NetworkError } from "../error/network-error/network-error.component";
import { ThemedActivityIndicator } from "../ui/themed-activity-indicator/themed-activity-indicator.component";

export const InfiniteScrollFooter: React.FC<{
  isFetchNextPageError: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  message?: string;
}> = ({ isFetchNextPageError, isFetchingNextPage, fetchNextPage, message }) => {
  if (isFetchNextPageError) {
    return (
      <>
        <NetworkError message={message} refetch={fetchNextPage} />
        <VerticalSpacing size={4} />
      </>
    );
  }

  if (isFetchingNextPage) {
    return (
      <>
        <ThemedActivityIndicator />
        <VerticalSpacing size={4} />
      </>
    );
  }

  return null;
};

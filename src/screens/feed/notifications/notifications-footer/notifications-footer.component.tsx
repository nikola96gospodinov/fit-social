import { NetworkError } from "@/src/components/error/network-error/network-error.component";
import { InfiniteScrollFooter } from "@/src/components/infinite-scroll-footer/infinite-scroll-footer.component";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ThemedActivityIndicator } from "@/src/components/ui/themed-activity-indicator/themed-activity-indicator.component";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";

type Props = {
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
  count: number | undefined | null;
  emptyStateText: string;
  isFetchNextPageError?: boolean;
  isFetchingNextPage?: boolean;
  fetchNextPage?: () => void;
};

export const NotificationsFooter = ({
  isLoading,
  isError,
  refetch,
  count,
  emptyStateText,
  isFetchNextPageError,
  isFetchingNextPage,
  fetchNextPage,
}: Props) => {
  if (isFetchNextPageError || isFetchingNextPage) {
    return (
      <InfiniteScrollFooter
        isFetchNextPageError={isFetchNextPageError || false}
        isFetchingNextPage={isFetchingNextPage || false}
        fetchNextPage={fetchNextPage || (() => {})}
        message="Failed to fetch more notifications"
      />
    );
  }

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

        <ThemedText style={{ textAlign: "center" }}>
          {emptyStateText}
        </ThemedText>
      </>
    );
  }

  return null;
};

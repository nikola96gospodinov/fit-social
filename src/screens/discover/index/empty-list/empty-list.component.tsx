import { NetworkError } from "@/src/components/error/network-error/network-error.component";
import { OrSeparator } from "@/src/components/or-separator/or-separator.component";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ThemedActivityIndicator } from "@/src/components/ui/themed-activity-indicator/themed-activity-indicator.component";
import { ThemedButton } from "@/src/components/ui/themed-button/themed-button.component";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { Suggestions } from "@/src/screens/feed/index/suggestions/suggestions.component";

type Props = {
  isLoading: boolean;
  isError: boolean;
  noResultsFound: boolean;
  refetch: () => void;
};

export const EmptyDiscoverList = ({
  isLoading,
  isError,
  noResultsFound,
  refetch,
}: Props) => {
  if (isLoading) {
    return (
      <>
        <VerticalSpacing size={4} />

        <ThemedActivityIndicator />
      </>
    );
  }

  if (isError) {
    return <NetworkError refetch={refetch} />;
  }

  if (noResultsFound) {
    return (
      <>
        <ThemedText style={{ textAlign: "center" }}>
          No results found 🤔
        </ThemedText>

        <VerticalSpacing size={4} />

        <ThemedButton text="Invite friends" size="sm" isFullWidth />

        <VerticalSpacing size={4} />

        <OrSeparator />

        <VerticalSpacing size={4} />

        <ThemedText style={{ textAlign: "center" }}>
          Or, follow accounts you know
        </ThemedText>

        <VerticalSpacing size={8} />

        <Suggestions />
      </>
    );
  }

  return null;
};

import { FullScreenCenteredView } from "@/src/components/ui/layout/full-screen-centered-view/full-screen-centered-view.component";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { useGetFollowing } from "@/src/services/follows/get-following.service";
import { Suggestions } from "./suggestions/suggestions.component";
import { ThemedActivityIndicator } from "@/src/components/ui/themed-activity-indicator/themed-activity-indicator.component";

export const FeedContent = () => {
  const { data: following, isLoading: followingLoading } = useGetFollowing();

  if (followingLoading) {
    return <ThemedActivityIndicator />;
  }

  if (following?.length === 0) {
    return <Suggestions />;
  }

  return (
    <FullScreenCenteredView>
      <ThemedText type="title">⏳ Coming Soon...</ThemedText>
    </FullScreenCenteredView>
  );
};

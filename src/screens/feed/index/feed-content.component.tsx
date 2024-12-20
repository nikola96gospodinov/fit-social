import { useGetInfiniteFollowing } from "@/src/services/follows/get-following.service";
import { Suggestions } from "./suggestions/suggestions.component";
import { ThemedActivityIndicator } from "@/src/components/ui/themed-activity-indicator/themed-activity-indicator.component";
import { WorkoutsList } from "./workouts-list/workouts-list.component";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";

export const FeedContent = () => {
  const { data: following, isLoading: followingLoading } =
    useGetInfiniteFollowing();

  if (followingLoading) {
    return (
      <>
        <VerticalSpacing size={4} />

        <ThemedActivityIndicator />
      </>
    );
  }

  if (following?.pages[0].items.length === 0) {
    return <Suggestions />;
  }

  return <WorkoutsList />;
};

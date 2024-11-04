import { useGetProfile } from "@/src/services/profile/get-profile.service";
import { FullScreenCenteredView } from "@/src/components/ui/layout/full-screen-centered-view/full-screen-centered-view.component";
import { ThemedActivityIndicator } from "@/src/components/ui/themed-activity-indicator/themed-activity-indicator.component";
import { PastWorkouts } from "./past-workouts/past-workouts.component";
import { FullScreenError } from "@/src/components/error/full-screen-error/full-screen-error.component";

export const ProfileContent = () => {
  const { isLoading, isError, refetch } = useGetProfile();

  if (isLoading) {
    return (
      <FullScreenCenteredView>
        <ThemedActivityIndicator />
      </FullScreenCenteredView>
    );
  }

  if (isError) {
    return (
      <FullScreenError
        message="Something went wrong. Please try again"
        refetch={refetch}
      />
    );
  }

  return <PastWorkouts />;
};

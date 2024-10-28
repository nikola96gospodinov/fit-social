import { useGetProfile } from "@/src/services/profile/get-profile.service";
import { FullScreenCenteredView } from "@/src/components/ui/layout/full-screen-centered-view/full-screen-centered-view.component";
import { ThemedActivityIndicator } from "@/src/components/ui/themed-activity-indicator/themed-activity-indicator.component";
import { PastWorkouts } from "./past-workouts/past-workouts.component";

export const ProfileContent = () => {
  const { isLoading } = useGetProfile();

  if (isLoading) {
    return (
      <FullScreenCenteredView>
        <ThemedActivityIndicator />
      </FullScreenCenteredView>
    );
  }

  return <PastWorkouts />;
};

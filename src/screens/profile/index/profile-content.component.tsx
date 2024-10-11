import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { useGetProfile } from "@/src/services/profile/get-profile.service";
import { View } from "react-native";
import { FullScreenCenteredView } from "@/src/components/ui/layout/full-screen-centered-view/full-screen-centered-view.component";
import { ThemedActivityIndicator } from "@/src/components/ui/themed-activity-indicator/themed-activity-indicator.component";
import { ProfileHeader } from "./profile-header/profile-header.component";
import { Stats } from "./stats/stats.component";

export const ProfileContent = () => {
  const { data: profile, isLoading } = useGetProfile();

  if (isLoading || !profile) {
    return (
      <FullScreenCenteredView>
        <ThemedActivityIndicator />
      </FullScreenCenteredView>
    );
  }

  return (
    <View>
      <ProfileHeader />

      <VerticalSpacing size={3} />

      <Stats />
    </View>
  );
};

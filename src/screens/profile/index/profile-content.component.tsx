import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ThemedButton } from "@/src/components/ui/themed-button/themed-button.component";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { useLogout } from "@/src/services/auth/logout.service";
import { getFormattedDate } from "@/src/utils/dates.utils";
import { useGetProfile } from "@/src/services/profile/get-profile.service";
import { View } from "react-native";
import { FullScreenCenteredView } from "@/src/components/ui/layout/full-screen-centered-view/full-screen-centered-view.component";
import { ThemedActivityIndicator } from "@/src/components/ui/themed-activity-indicator/themed-activity-indicator.component";
import { ProfileHeader } from "./profile-header/profile-header.component";
import { Stats } from "./stats/stats.component";

export const ProfileContent = () => {
  const { data: profile, isLoading } = useGetProfile();

  const { mutate: logout, isPending } = useLogout();

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

      <VerticalSpacing size={8} />

      <ThemedText>
        Member since: {getFormattedDate(profile.created_at)}
      </ThemedText>

      <VerticalSpacing size={2} />

      <ThemedButton
        text="Sign out"
        onPress={() => logout()}
        isLoading={isPending}
        size="sm"
      />
    </View>
  );
};

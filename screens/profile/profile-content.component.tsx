import { FullScreenCenteredView } from "@/components/ui/layout/full-screen-centered-view/full-screen-centered-view.component";
import { VerticalSpacing } from "@/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ThemedButton } from "@/components/ui/themed-button/themed-button.component";
import { ThemedText } from "@/components/ui/themed-text/themed-text.component";
import { useGetProfile } from "@/services/auth/get-profile.service";
import { useLogout } from "@/services/auth/logout.service";
import { getFormattedDate } from "@/utils/dates.utils";

export const ProfileContent = () => {
  const { data: profile } = useGetProfile();

  const { mutate: logout, isPending } = useLogout();

  if (!profile) {
    return null;
  }

  return (
    <FullScreenCenteredView>
      <ThemedText type="title">Your profile</ThemedText>

      <VerticalSpacing size={2} />

      <ThemedText type="subtitle">
        Member since: {getFormattedDate(profile?.created_at)}
      </ThemedText>

      <VerticalSpacing size={6} />

      <ThemedButton
        text="Sign out"
        onPress={() => logout()}
        isLoading={isPending}
      />
    </FullScreenCenteredView>
  );
};

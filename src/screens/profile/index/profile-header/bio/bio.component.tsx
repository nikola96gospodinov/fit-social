import { StyleSheet } from "react-native";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { useGetProfile } from "@/src/services/profile/get-profile.service";

export const Bio = () => {
  const { data: profile } = useGetProfile();

  if (!profile?.full_name && !profile?.bio) return null;

  const showSpacing = profile.full_name && profile.bio;

  return (
    <>
      {profile.full_name && (
        <ThemedText type="small" style={styles.fullName}>
          {profile.full_name}
        </ThemedText>
      )}

      {showSpacing && <VerticalSpacing size={0.5} />}

      {profile.bio && <ThemedText type="extraSmall">{profile.bio}</ThemedText>}
    </>
  );
};

const styles = StyleSheet.create({
  fullName: {
    fontWeight: "600",
  },
});

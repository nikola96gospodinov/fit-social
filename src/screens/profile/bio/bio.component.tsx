import { StyleSheet } from "react-native";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { useGetProfile } from "@/src/services/profile/get-profile.service";

export const Bio = () => {
  const { data: profile } = useGetProfile();

  if (!profile) return null;

  return (
    <>
      {/* TODO: Fix */}
      <ThemedText type="small" style={styles.fullName}>
        {profile.full_name ?? "Nik Gospodinov"}
      </ThemedText>

      <VerticalSpacing size={0.5} />

      <ThemedText type="small" style={styles.bio}>
        {profile.bio ??
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien. Sed ut purus eget sapien."}
      </ThemedText>
    </>
  );
};

const styles = StyleSheet.create({
  fullName: {
    fontWeight: "600",
  },

  bio: {
    lineHeight: 16,
    fontSize: 13,
  },
});

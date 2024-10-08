import { spacing } from "@/src/constants/spacing.constants";
import { View, StyleSheet } from "react-native";
import { useGetProfile } from "@/src/services/profile/get-profile.service";
import { ThemedActivityIndicator } from "@/src/components/ui/themed-activity-indicator/themed-activity-indicator.component";
import { EditAvatar } from "./edit-avatar/edit-avatar.component";

export const EditProfileContent = () => {
  const { data: profile, isLoading } = useGetProfile();

  if (isLoading || !profile) return <ThemedActivityIndicator />;

  return (
    <View style={styles.container}>
      <EditAvatar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing[4],
  },
});

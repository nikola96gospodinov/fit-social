import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { ProfileHeader } from "./profile-header/profile-header.component";
import { Stats } from "../../../../features/profile/stats/stats.component";
import { spacing } from "@/src/constants/spacing.constants";
import { StyleSheet, View } from "react-native";

export const ListHeader = () => {
  return (
    <>
      <ProfileHeader />

      <VerticalSpacing size={3} />

      <View style={styles.container}>
        <Stats />
      </View>

      <VerticalSpacing size={6} />

      <View style={styles.container}>
        <ThemedText type="subtitle">Past Workouts</ThemedText>
      </View>

      <VerticalSpacing size={6} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing[4],
  },
});

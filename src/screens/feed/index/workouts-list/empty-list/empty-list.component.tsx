import { ThemedActivityIndicator } from "@/src/components/ui/themed-activity-indicator/themed-activity-indicator.component";
import { Suggestions } from "../../suggestions/suggestions.component";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { StyleSheet, View } from "react-native";
import { spacing } from "@/src/constants/spacing.constants";
import { NetworkError } from "@/src/components/error/network-error/network-error.component";

type Props = {
  isLoading: boolean;
  isLoadingError: boolean;
  refetch: () => void;
};

export const EmptyList = ({ isLoading, isLoadingError, refetch }: Props) => {
  if (isLoading) {
    return (
      <>
        <VerticalSpacing size={4} />

        <ThemedActivityIndicator />
      </>
    );
  }

  if (isLoadingError) {
    return (
      <NetworkError message="Failed to fetch exercises" refetch={refetch} />
    );
  }

  return (
    <>
      <View style={styles.container}>
        <ThemedText>No workout updates 🤔</ThemedText>

        <VerticalSpacing size={1} />

        <ThemedText type="small" color="supporting">
          Follow more people to see their workout updates
        </ThemedText>
      </View>

      <VerticalSpacing size={2} />

      <Suggestions />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing[4],
    paddingTop: spacing[4],
  },
});

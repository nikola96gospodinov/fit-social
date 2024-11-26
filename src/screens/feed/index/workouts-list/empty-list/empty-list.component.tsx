import { ThemedActivityIndicator } from "@/src/components/ui/themed-activity-indicator/themed-activity-indicator.component";
import { Suggestions } from "../../suggestions/suggestions.component";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { StyleSheet, View } from "react-native";
import { spacing } from "@/src/constants/spacing.constants";

type Props = {
  isLoading: boolean;
};

export const EmptyList = ({ isLoading }: Props) => {
  if (isLoading) {
    return (
      <>
        <VerticalSpacing size={4} />

        <ThemedActivityIndicator />
      </>
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

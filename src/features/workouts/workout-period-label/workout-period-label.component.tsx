import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { spacing } from "@/src/constants/spacing.constants";
import { View, StyleSheet } from "react-native";

type Props = {
  period: string;
};

export const WorkoutPeriodLabel = ({ period }: Props) => {
  return (
    <View style={styles.sectionHeader}>
      <ThemedText type="small" color="supporting">
        {period}
      </ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    paddingHorizontal: spacing[4],
    marginBottom: -spacing[4],
  },
});

import { Flex } from "@/src/components/ui/layout/flex/flex.component";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ThemedActivityIndicator } from "@/src/components/ui/themed-activity-indicator/themed-activity-indicator.component";
import { ThemedButton } from "@/src/components/ui/themed-button/themed-button.component";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { spacing } from "@/src/constants/spacing.constants";
import { StyleSheet } from "react-native";

type Props = {
  isLoading: boolean;
};

export const EmptyFollowersList = ({ isLoading }: Props) => {
  if (isLoading) {
    return <ThemedActivityIndicator />;
  }

  return (
    <Flex justify="center" align="center" style={styles.container}>
      <ThemedText>No followers 🤔</ThemedText>

      <VerticalSpacing size={2} />

      <ThemedText type="small" color="supporting" style={styles.text}>
        Follow people to see their followers and posts in your feed
      </ThemedText>

      <VerticalSpacing size={4} />

      <ThemedButton text="Find people to follow" size="sm" isFullWidth />
    </Flex>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing[8],
    paddingHorizontal: spacing[4],
  },

  text: {
    textAlign: "center",
  },
});

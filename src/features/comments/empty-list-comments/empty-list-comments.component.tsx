import { NetworkError } from "@/src/components/error/network-error/network-error.component";
import { Flex } from "@/src/components/ui/layout/flex/flex.component";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ThemedActivityIndicator } from "@/src/components/ui/themed-activity-indicator/themed-activity-indicator.component";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { spacing } from "@/src/constants/spacing.constants";
import { StyleSheet } from "react-native";

type Props = {
  isError: boolean;
  refetch: () => void;
  isLoading: boolean;
};

export const EmptyListComments = ({ isError, refetch, isLoading }: Props) => {
  if (isLoading) {
    return (
      <>
        <VerticalSpacing size={4} />

        <ThemedActivityIndicator />
      </>
    );
  }

  if (isError) {
    return (
      <>
        <VerticalSpacing size={4} />

        <NetworkError refetch={refetch} />
      </>
    );
  }

  return (
    <Flex style={styles.container} justify="center" align="center">
      <ThemedText type="subtitle">No comments yet</ThemedText>
    </Flex>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing[4],
    flex: 1,
  },
});

import { Flex } from "@/src/components/ui/layout/flex/flex.component";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ThemedActivityIndicator } from "@/src/components/ui/themed-activity-indicator/themed-activity-indicator.component";
import { ThemedButton } from "@/src/components/ui/themed-button/themed-button.component";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { spacing } from "@/src/constants/spacing.constants";
import { router } from "expo-router";
import { StyleSheet } from "react-native";

type Props = {
  isLoading: boolean;
  text: string;
};

export const EmptyFollowersList = ({ isLoading, text }: Props) => {
  if (isLoading) {
    return <ThemedActivityIndicator />;
  }

  return (
    <Flex justify="center" align="center" style={styles.container}>
      <ThemedText>{text}</ThemedText>

      <VerticalSpacing size={2} />

      <ThemedText type="small" color="supporting" style={styles.text}>
        Follow people to see their followers and posts in your feed
      </ThemedText>

      <VerticalSpacing size={4} />

      <ThemedButton
        text="Find people to follow"
        size="sm"
        isFullWidth
        onPress={() => {
          // This is a workaround due to a bug in expo-router - https://github.com/expo/expo/issues/26922
          router.back();
          router.push("/discover");
        }}
      />
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

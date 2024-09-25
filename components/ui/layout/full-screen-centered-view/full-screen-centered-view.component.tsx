import { spacing } from "@/constants/spacing.constants";
import { PropsWithChildren } from "react";
import { SafeAreaView, StyleSheet } from "react-native";

export const FullScreenCenteredView = ({ children }: PropsWithChildren) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    marginHorizontal: spacing[4],
  },
});

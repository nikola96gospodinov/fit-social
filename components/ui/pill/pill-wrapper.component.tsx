import { spacing } from "@/constants/spacing.constants";
import { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";

export const PillWrapper = ({ children }: PropsWithChildren) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing[2],
  },
});

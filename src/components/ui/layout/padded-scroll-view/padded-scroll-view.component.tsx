import { spacing } from "@/src/constants/spacing.constants";
import { PropsWithChildren } from "react";
import { ScrollView } from "react-native";

export const PaddedScrollView = ({ children }: PropsWithChildren) => {
  return <ScrollView style={{ padding: spacing[4] }}>{children}</ScrollView>;
};

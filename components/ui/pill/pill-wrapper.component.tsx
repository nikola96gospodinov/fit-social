import { spacing } from "@/constants/spacing.constants";
import { PropsWithChildren } from "react";
import { View } from "react-native";

export const PillWrapper = ({ children }: PropsWithChildren) => {
  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing[2] }}>
      {children}
    </View>
  );
};

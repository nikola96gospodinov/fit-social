import { Spacing, spacing } from "@/constants/spacing.constants";
import { PropsWithChildren } from "react";
import { View } from "react-native";

type Props = PropsWithChildren<{
  direction?: "row" | "column";
  align?: "center" | "flex-start" | "flex-end";
  justify?: "center" | "flex-start" | "flex-end";
  wrap?: "wrap" | "nowrap";
  gap?: Spacing;
}>;

export const Flex = ({
  children,
  direction,
  align,
  justify,
  wrap,
  gap,
}: Props) => {
  return (
    <View
      style={{
        flexDirection: direction,
        alignItems: align,
        justifyContent: justify,
        flexWrap: wrap,
        width: "100%",
        gap: gap ? spacing[gap] : 0,
      }}
    >
      {children}
    </View>
  );
};

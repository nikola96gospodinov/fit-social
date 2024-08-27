import { Spacing, spacing } from "@/constants/spacing.constants";
import { PropsWithChildren } from "react";
import { View, ViewProps } from "react-native";

type Props = PropsWithChildren<{
  direction?: "row" | "column";
  align?: "center" | "flex-start" | "flex-end";
  justify?: "center" | "flex-start" | "flex-end" | "space-between";
  wrap?: "wrap" | "nowrap";
  gap?: Spacing;
  style?: ViewProps["style"];
}>;

export const Flex = ({
  children,
  direction,
  align,
  justify,
  wrap,
  gap,
  style,
}: Props) => {
  const styles = [
    {
      flexDirection: direction,
      alignItems: align,
      justifyContent: justify,
      flexWrap: wrap,
      gap: gap ? spacing[gap] : 0,
    },
    style,
  ];

  return <View style={styles}>{children}</View>;
};

import { Spacing } from "@/constants/spacing.constants";
import { PropsWithChildren } from "react";
import { View } from "react-native";

type Props = PropsWithChildren<{
  margin?: Spacing;
  marginHorizontal?: Spacing;
  marginVertical?: Spacing;
  marginTop?: Spacing;
  marginBottom?: Spacing;
  marginLeft?: Spacing;
  marginRight?: Spacing;

  padding?: Spacing;
  paddingHorizontal?: Spacing;
  paddingVertical?: Spacing;
  paddingTop?: Spacing;
  paddingBottom?: Spacing;
  paddingLeft?: Spacing;
  paddingRight?: Spacing;
}>;

export const Box = ({ children, ...rest }: Props) => {
  return <View style={{ ...rest }}>{children}</View>;
};

import { View } from "react-native";
import { Spacing, spacing } from "@/constants/spacing.constants";

type Props = {
  size: Spacing;
};

export const VerticalSpacing = ({ size }: Props) => {
  const height = spacing[size];

  return <View style={{ height }} />;
};

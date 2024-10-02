import { View } from "react-native";
import { Spacing, spacing } from "@/src/constants/spacing.constants";

type Props = {
  size: Spacing;
  isHorizontal?: boolean;
};

export const VerticalSpacing = ({ size, isHorizontal }: Props) => {
  const height = spacing[size];

  return <View style={{ height, width: isHorizontal ? height : 0 }} />;
};

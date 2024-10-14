import { colors } from "@/src/constants/colors.constants";
import { ActivityIndicator, useColorScheme, View } from "react-native";
import { ThemedText } from "../themed-text/themed-text.component";
import { spacing, Spacing } from "@/src/constants/spacing.constants";

type Props = {
  loadingMessage?: string;
  size?: "small" | "large" | number;
  isNeutral?: boolean;
  padding?: Spacing;
};

export const ThemedActivityIndicator = ({
  loadingMessage,
  size = "large",
  isNeutral = false,
  padding,
}: Props) => {
  const theme = useColorScheme() ?? "light";

  return (
    <View style={{ padding: padding ? spacing[padding] : undefined }}>
      <ActivityIndicator
        size={size}
        color={
          isNeutral ? colors[theme].invertedText : colors[theme].activeIcon
        }
      />

      {loadingMessage && <ThemedText>{loadingMessage}</ThemedText>}
    </View>
  );
};

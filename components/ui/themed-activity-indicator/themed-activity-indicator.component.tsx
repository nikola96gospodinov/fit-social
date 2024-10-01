import { colors } from "@/constants/colors.constants";
import { ActivityIndicator, useColorScheme, View } from "react-native";
import { ThemedText } from "../themed-text/themed-text.component";

type Props = {
  loadingMessage?: string;
  size?: "small" | "large" | number;
  isNeutral?: boolean;
};

export const ThemedActivityIndicator = ({
  loadingMessage,
  size = "large",
  isNeutral = false,
}: Props) => {
  const theme = useColorScheme() ?? "light";

  return (
    <View>
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

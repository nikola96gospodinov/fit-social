import { colors } from "@/constants/colors.constants";
import { ActivityIndicator, useColorScheme, View } from "react-native";
import { ThemedText } from "../themed-text/themed-text.component";

type Props = {
  loadingMessage?: string;
};

export const ThemedActivityIndicator = ({ loadingMessage }: Props) => {
  const theme = useColorScheme() ?? "light";

  return (
    <View>
      <ActivityIndicator size="large" color={colors[theme].activeIcon} />

      {loadingMessage && <ThemedText>{loadingMessage}</ThemedText>}
    </View>
  );
};

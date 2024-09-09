import { colors } from "@/constants/colors.constants";
import { ActivityIndicator, useColorScheme } from "react-native";

export const ThemedActivityIndicator = () => {
  const theme = useColorScheme() ?? "light";

  return <ActivityIndicator size="large" color={colors[theme].fill} />;
};

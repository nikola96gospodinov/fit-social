import { useColorScheme, StyleSheet } from "react-native";
import { ThemedText } from "../ui/themed-text/themed-text.component";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "@/constants/colors.constants";
import { Flex } from "../ui/layout/flex/flex.component";

type Props = {
  text: string;
};

export const ConfirmationBox = ({ text }: Props) => {
  const theme = useColorScheme() ?? "light";

  return (
    <Flex
      direction="row"
      align="center"
      gap={2}
      style={[
        styles.container,
        {
          backgroundColor: colors[theme].successBackground,
        },
      ]}>
      <Ionicons
        name="checkmark-done-sharp"
        size={20}
        color={colors[theme].success}
      />
      <ThemedText>{text}</ThemedText>
    </Flex>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
});

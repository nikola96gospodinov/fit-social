import { Flex } from "@/src/components/ui/layout/flex/flex.component";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { colors } from "@/src/constants/colors.constants";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Pressable, useColorScheme, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

type Props = {
  message?: string;
  refetch?: (...args: any) => void;
};

export const NetworkError = ({ message, refetch }: Props) => {
  const theme = useColorScheme() ?? "light";

  return (
    <Flex
      direction="row"
      justify="space-between"
      align="center"
      style={[
        { backgroundColor: colors[theme].destructiveBackground },
        styles.container,
      ]}>
      <Flex direction="row" gap={2} align="center">
        <MaterialIcons
          name="error-outline"
          size={20}
          color={colors[theme].destructiveIcon}
        />

        <ThemedText type="small" color="error">
          {message || "Something went wrong"}
        </ThemedText>
      </Flex>

      {refetch && (
        <Pressable onPress={() => refetch()}>
          <FontAwesome
            name="repeat"
            size={18}
            color={colors[theme].destructiveIcon}
          />
        </Pressable>
      )}
    </Flex>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 12,
    alignSelf: "stretch",
  },
});

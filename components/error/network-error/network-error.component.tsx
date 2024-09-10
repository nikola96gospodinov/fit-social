import { Flex } from "@/components/ui/layout/flex/flex.component";
import { ThemedText } from "@/components/ui/themed-text.component";
import { colors } from "@/constants/colors.constants";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Pressable, useColorScheme, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

type Props = {
  message: string;
  refetch?: (...args: any) => void;
};

export const NetworkError = ({ message, refetch }: Props) => {
  const theme = useColorScheme() ?? "light";

  return (
    <View
      style={{
        backgroundColor: colors[theme].destructiveBackground,
        padding: 12,
        borderRadius: 12,
      }}
    >
      <Flex direction="row" justify="space-between" align="center">
        <Flex direction="row" gap={2} align="center">
          <MaterialIcons
            name="error-outline"
            size={20}
            color={colors[theme].destructiveText}
          />

          <ThemedText type="small" color="error">
            {message}
          </ThemedText>
        </Flex>

        {refetch && (
          <Pressable onPress={() => refetch()}>
            <FontAwesome
              name="repeat"
              size={18}
              color={colors[theme].destructiveText}
            />
          </Pressable>
        )}
      </Flex>
    </View>
  );
};

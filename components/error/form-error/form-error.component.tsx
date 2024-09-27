import { useColorScheme } from "react-native";
import { ThemedText } from "@/components/ui/themed-text/themed-text.component";
import { Flex } from "@/components/ui/layout/flex/flex.component";
import { colors } from "@/constants/colors.constants";
import { MaterialIcons } from "@expo/vector-icons";

type Props = {
  error: string;
};

export const FormError = ({ error }: Props) => {
  const theme = useColorScheme() ?? "light";

  return (
    <Flex
      direction="row"
      gap={1}
      align="center"
      style={{ alignSelf: "flex-start" }}>
      <MaterialIcons
        name="error-outline"
        size={16}
        color={colors[theme].destructiveText}
      />

      <ThemedText type="small" color="error">
        {error}
      </ThemedText>
    </Flex>
  );
};

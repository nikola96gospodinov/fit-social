import { Flex } from "@/src/components/ui/layout/flex/flex.component";
import { colors } from "@/src/constants/colors.constants";
import { useColorScheme } from "react-native";
import EvilIcons from "@expo/vector-icons/EvilIcons";

export const Actions = () => {
  const theme = useColorScheme() ?? "light";

  return (
    <Flex direction="row" gap={2}>
      <EvilIcons name="heart" size={30} color={colors[theme].icon} />

      <EvilIcons name="comment" size={30} color={colors[theme].icon} />
    </Flex>
  );
};

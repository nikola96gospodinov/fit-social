import { Flex } from "@/src/components/ui/layout/flex/flex.component";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { colors } from "@/src/constants/colors.constants";
import { useActiveWorkoutStore } from "@/src/store/active-workout-store";
import { getFormattedDate } from "@/src/utils/dates.utils";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useColorScheme } from "react-native";

export const EditWorkoutHeaderTitle = () => {
  const theme = useColorScheme() ?? "light";

  const {
    store: { started },
  } = useActiveWorkoutStore();

  const date = getFormattedDate(started);

  return (
    <Flex direction="row" gap={2} align="center" justify="center">
      <Ionicons name="calendar" size={16} color={colors[theme].icon} />

      <ThemedText>{date}</ThemedText>
    </Flex>
  );
};

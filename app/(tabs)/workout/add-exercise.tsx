import { ThemedTextInput } from "@/components/ui/themed-text-input/themed-text-input.component";
import { spacing } from "@/constants/spacing.constants";
import { ScrollView, useColorScheme } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Flex } from "@/components/ui/layout/flex/flex.component";
import { colors } from "@/constants/colors.constants";

const AddExercise = () => {
  const colorScheme = useColorScheme();

  return (
    <ScrollView style={{ padding: spacing[2], paddingTop: spacing[4] }}>
      <Flex align="center" direction="row" gap={spacing[0.5]}>
        <ThemedTextInput icon={{ name: "search", size: 16 }} />

        <MaterialCommunityIcons
          name="filter"
          size={24}
          color={colors[colorScheme ?? "light"].text}
        />
      </Flex>
    </ScrollView>
  );
};

export default AddExercise;

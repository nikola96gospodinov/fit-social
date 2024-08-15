import { ThemedTextInput } from "@/components/ui/themed-text-input/themed-text-input.component";
import { spacing } from "@/constants/spacing.constants";
import { ScrollView } from "react-native";
import { Flex } from "@/components/ui/layout/flex/flex.component";
import { FilterIcon } from "@/features/workout/add-exercises/filter-icon/filter-icon.component";

const AddExercise = () => {
  return (
    <ScrollView style={{ padding: spacing[2], paddingTop: spacing[4] }}>
      <Flex align="center" direction="row" gap={spacing[0.5]}>
        <ThemedTextInput icon={{ name: "search", size: 16 }} />

        <FilterIcon filters={[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]} />
      </Flex>
    </ScrollView>
  );
};

export default AddExercise;

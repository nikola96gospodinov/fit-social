import { ThemedTextInput } from "@/components/ui/themed-text-input/themed-text-input.component";
import { spacing } from "@/constants/spacing.constants";
import { ScrollView } from "react-native";
import { Flex } from "@/components/ui/layout/flex/flex.component";
import { FilterIcon } from "@/features/workout/add-exercises/filter-icon/filter-icon.component";
import { useExerciseFilterStore } from "@/store/exercise-filter-store";

const AddExercise = () => {
  const { activeFilters, activeSearch, setActiveSearch } =
    useExerciseFilterStore();

  return (
    <ScrollView style={{ padding: spacing[2], paddingTop: spacing[4] }}>
      <Flex align="center" direction="row" gap={spacing[0.5]}>
        <ThemedTextInput
          icon={{ name: "search", size: 16 }}
          value={activeSearch}
          onChangeText={setActiveSearch}
        />

        <FilterIcon filters={activeFilters} />
      </Flex>
    </ScrollView>
  );
};

export default AddExercise;

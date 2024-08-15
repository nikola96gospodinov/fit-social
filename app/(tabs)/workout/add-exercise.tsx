import { ThemedTextInput } from "@/components/ui/themed-text-input/themed-text-input.component";
import { spacing } from "@/constants/spacing.constants";
import { Flex } from "@/components/ui/layout/flex/flex.component";
import { FilterIcon } from "@/features/workout/add-exercises/filter-icon/filter-icon.component";
import { useExerciseFilterStore } from "@/store/exercise-filter-store";
import { PaddedScrollView } from "@/components/padded-scroll-view/padded-scroll-view.component";

const AddExercise = () => {
  const { activeFilters, activeSearch, setActiveSearch } =
    useExerciseFilterStore();

  return (
    <PaddedScrollView>
      <Flex
        align="center"
        direction="row"
        gap={spacing[0.5]}
        style={{ paddingTop: spacing[2] }}
      >
        <ThemedTextInput
          icon={{ name: "search", size: 16 }}
          value={activeSearch}
          onChangeText={setActiveSearch}
        />

        <FilterIcon filters={activeFilters} />
      </Flex>
    </PaddedScrollView>
  );
};

export default AddExercise;

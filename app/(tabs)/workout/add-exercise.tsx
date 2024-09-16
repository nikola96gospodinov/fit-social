import { ThemedTextInput } from "@/components/ui/themed-text-input/themed-text-input.component";
import { spacing } from "@/constants/spacing.constants";
import { Flex } from "@/components/ui/layout/flex/flex.component";
import { FilterIcon } from "@/features/workout/add-exercises/filter-icon/filter-icon.component";
import { useExerciseFilterStore } from "@/store/exercise-filter-store";
import { FlatList, Platform, View } from "react-native";
import { VerticalSpacing } from "@/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { FoundExercises } from "@/features/workout/add-exercises/found-exercises/found-exercises.component";
import { useDebounce } from "@/hooks/use-debounce";
import { AddIcon } from "@/features/workout/add-exercises/add-icon/add-icon.component";
import { Exercise } from "@/types/api/exercise.types";
import { useState } from "react";
import { ThemedButton } from "@/components/ui/themed-button/themed-button.component";
import { Pill } from "@/components/ui/pill/pill.component";

const AddExercise = () => {
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);

  const { activeSearch, setActiveSearch, clearFilters, filters, removeFilter } =
    useExerciseFilterStore();

  const debouncedActiveSearch = useDebounce<string>({ value: activeSearch });

  const numberOfFilters = filters.length;

  return (
    <View style={{ padding: spacing[4], flex: 1, paddingBottom: 0 }}>
      <Flex
        align="center"
        direction="row"
        gap={spacing[0.5]}
        style={{
          paddingTop: spacing[2],
          paddingRight: Platform.OS === "android" ? spacing[1] : 0,
          overflow: "visible",
        }}>
        <View style={{ flex: 1 }}>
          <ThemedTextInput
            clearButton
            icon={{ name: "search", size: 16 }}
            value={activeSearch}
            onChangeText={setActiveSearch}
          />
        </View>

        <FilterIcon numberOfFilters={numberOfFilters} />
      </Flex>

      {numberOfFilters > 0 && (
        <>
          <VerticalSpacing size={2} />

          <Flex direction="row" gap={spacing[1]} align="center">
            <FlatList
              data={filters}
              renderItem={({ item: filter }) => (
                <Pill
                  label={filter.value}
                  isActive={false}
                  onDelete={() => removeFilter(filter)}
                />
              )}
              horizontal
              ItemSeparatorComponent={() => (
                <VerticalSpacing size={1} isHorizontal />
              )}
            />

            <ThemedButton
              text="Clear filters"
              variant="flat"
              onPress={() => clearFilters()}
            />
          </Flex>
        </>
      )}

      <VerticalSpacing size={8} />

      <FoundExercises
        search={debouncedActiveSearch}
        selectedExercises={selectedExercises}
        setSelectedExercises={setSelectedExercises}
      />

      {selectedExercises.length > 0 && (
        <AddIcon selectedExercises={selectedExercises} />
      )}
    </View>
  );
};

export default AddExercise;

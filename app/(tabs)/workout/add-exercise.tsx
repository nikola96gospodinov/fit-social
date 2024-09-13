import { ThemedTextInput } from "@/components/ui/themed-text-input/themed-text-input.component";
import { spacing } from "@/constants/spacing.constants";
import { Flex } from "@/components/ui/layout/flex/flex.component";
import { FilterIcon } from "@/features/workout/add-exercises/filter-icon/filter-icon.component";
import { useExerciseFilterStore } from "@/store/exercise-filter-store";
import { Platform, View } from "react-native";
import { VerticalSpacing } from "@/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ActiveExercises } from "@/features/workout/add-exercises/active-exercises/active-exercises.component";
import { useDebounce } from "@/hooks/use-debounce";
import { AddIcon } from "@/features/workout/add-exercises/add-icon/add-icon.component";
import { Exercise } from "@/types/api/exercise.types";
import { useState } from "react";

const AddExercise = () => {
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);

  const { getTotalNumberOfFilters, activeSearch, setActiveSearch } =
    useExerciseFilterStore();

  const debouncedActiveSearch = useDebounce<string>({ value: activeSearch });

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
        <ThemedTextInput
          clearButton
          icon={{ name: "search", size: 16 }}
          value={activeSearch}
          onChangeText={setActiveSearch}
        />

        <FilterIcon numberOfFilters={getTotalNumberOfFilters()} />
      </Flex>

      <VerticalSpacing size={8} />

      <ActiveExercises
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

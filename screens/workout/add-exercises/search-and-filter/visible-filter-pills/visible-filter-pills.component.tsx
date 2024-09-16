import { Flex } from "@/components/ui/layout/flex/flex.component";
import { VerticalSpacing } from "@/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { Pill } from "@/components/ui/pill/pill.component";
import { ThemedButton } from "@/components/ui/themed-button/themed-button.component";
import { spacing } from "@/constants/spacing.constants";
import { useExerciseFilterStore } from "@/store/exercise-filter-store";
import { FlatList } from "react-native";

export const VisibleFilterPills = () => {
  const { clearFilters, filters, removeFilter } = useExerciseFilterStore();

  return (
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
  );
};

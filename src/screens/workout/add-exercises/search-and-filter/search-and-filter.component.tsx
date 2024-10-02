import { Flex } from "@/src/components/ui/layout/flex/flex.component";
import { ThemedTextInput } from "@/src/components/ui/themed-text-input/themed-text-input.component";
import { spacing } from "@/src/constants/spacing.constants";
import { Platform, View, StyleSheet } from "react-native";
import { FilterIcon } from "./filter-icon/filter-icon.component";
import { useExerciseFilterStore } from "@/src/store/exercise-filter-store";
import { VisibleFilterPills } from "./visible-filter-pills/visible-filter-pills.component";

export const SearchAndFilter = () => {
  const { activeSearch, setActiveSearch, filters } = useExerciseFilterStore();

  const numberOfFilters = filters.length;

  return (
    <>
      <Flex
        align="center"
        direction="row"
        gap={spacing[0.5]}
        style={styles.topContainer}>
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

      {numberOfFilters > 0 && <VisibleFilterPills />}
    </>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    paddingTop: spacing[2],
    paddingRight: Platform.OS === "android" ? spacing[1] : 0,
    overflow: "visible",
  },
});

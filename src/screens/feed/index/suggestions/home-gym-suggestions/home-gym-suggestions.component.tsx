import { spacing } from "@/src/constants/spacing.constants";
import { FlashList } from "@shopify/flash-list";
import { StyleSheet } from "react-native";
import { HomeGymSuggestionsListHeader } from "./list-header/home-gym-suggestions-list-header.component";
import { useGetHomeGymSuggestions } from "@/src/services/suggestions/home-gym-suggestions.service";
import { HomeGymSuggestionsListEmpty } from "./list-empty/home-gym-suggestions-list-empty.component";

export const HomeGymSuggestions = () => {
  const { data: suggestions, isLoading: suggestionsLoading } =
    useGetHomeGymSuggestions();

  return (
    <FlashList
      data={suggestions}
      renderItem={() => null}
      contentContainerStyle={styles.container}
      ListHeaderComponent={HomeGymSuggestionsListHeader}
      ListEmptyComponent={HomeGymSuggestionsListEmpty}
      estimatedItemSize={100}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing[4],
  },
});

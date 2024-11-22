import { spacing } from "@/src/constants/spacing.constants";
import { FlashList } from "@shopify/flash-list";
import { StyleSheet } from "react-native";
import { HomeGymSuggestionsListHeader } from "./list-header/home-gym-suggestions-list-header.component";
import { useGetHomeGymSuggestions } from "@/src/services/suggestions/home-gym-suggestions.service";

export const HomeGymSuggestions = () => {
  const { data: suggestions, isLoading: suggestionsLoading } =
    useGetHomeGymSuggestions();

  return (
    <FlashList
      data={suggestions}
      renderItem={() => null}
      contentContainerStyle={styles.container}
      ListHeaderComponent={HomeGymSuggestionsListHeader}
      estimatedItemSize={100}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing[4],
  },
});

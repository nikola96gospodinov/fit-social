import { spacing } from "@/src/constants/spacing.constants";
import { FlatList, StyleSheet, View } from "react-native";
import { useGetHomeGymSuggestions } from "@/src/services/suggestions/home-gym-suggestions.service";
import { HomeGymSuggestionsListEmpty } from "./list-empty/home-gym-suggestions-list-empty.component";
import { SuggestionBox } from "../suggestion-box/suggestion-box.component";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";

export const HomeGymSuggestions = () => {
  const { data: suggestions, isLoading: suggestionsLoading } =
    useGetHomeGymSuggestions();

  if (!suggestions) return null;

  return (
    <View style={styles.container}>
      <ThemedText type="small" color="supporting" style={styles.title}>
        People from your gym
      </ThemedText>

      <VerticalSpacing size={4} />

      <FlatList
        data={suggestions}
        renderItem={({ item, index }) => (
          <SuggestionBox
            profile={item}
            isLast={index === suggestions.length - 1}
            isFirst={index === 0}
          />
        )}
        ListEmptyComponent={() => (
          <HomeGymSuggestionsListEmpty isLoading={suggestionsLoading} />
        )}
        ItemSeparatorComponent={() => <VerticalSpacing size={4} isHorizontal />}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing[4],
  },

  title: {
    paddingHorizontal: spacing[4],
  },
});

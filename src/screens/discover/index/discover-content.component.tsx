import { ThemedTextInput } from "@/src/components/ui/form/themed-text-input/themed-text-input.component";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { spacing } from "@/src/constants/spacing.constants";
import { FollowBox } from "@/src/features/follows/follow-box/follow-box.component";
import { useDebounce } from "@/src/hooks/use-debounce";
import { useSearchAccounts } from "@/src/services/discover/search-accounts.service";
import { FlashList } from "@shopify/flash-list";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { EmptyDiscoverList } from "./empty-list/empty-list.component";

export const DiscoverContent = () => {
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce({
    value: search,
  });

  const {
    data: accounts,
    isLoading,
    isError,
    refetch,
  } = useSearchAccounts(debouncedSearch);

  return (
    <View style={styles.container}>
      <ThemedTextInput
        clearButton
        icon={{ name: "search", size: 16 }}
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
        value={search}
        onChangeText={setSearch}
        label="Search by name or handle"
      />

      <VerticalSpacing size={8} />

      <FlashList
        data={accounts}
        renderItem={({ item }) => <FollowBox profile={item} />}
        estimatedItemSize={100}
        ItemSeparatorComponent={() => <VerticalSpacing size={5} />}
        ListEmptyComponent={
          <EmptyDiscoverList
            isLoading={isLoading}
            isError={isError}
            refetch={refetch}
            noResultsFound={accounts?.length === 0 && !isLoading}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing[4],
    height: "100%",
  },
});

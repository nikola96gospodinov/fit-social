import { spacing } from "@/src/constants/spacing.constants";
import { useGetInfiniteFollowing } from "@/src/services/follows/get-following.service";
import { FlashList } from "@shopify/flash-list";
import { EmptyFollowersList } from "../empty-followers-list/empty-followers-list.component";
import { FollowBox } from "../follow-box/follow-box.component";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { InfiniteScrollFooter } from "@/src/components/infinite-scroll-footer/infinite-scroll-footer.component";

export const Following = () => {
  const { id } = useLocalSearchParams();

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoadingError,
    refetch,
    isFetchNextPageError,
    isLoading,
  } = useGetInfiniteFollowing(id as string);

  const following = useMemo(() => {
    return data?.pages.flatMap((page) => page.items) ?? [];
  }, [data?.pages]);

  return (
    <FlashList
      data={following}
      onEndReached={() => hasNextPage && fetchNextPage()}
      onEndReachedThreshold={0.5}
      renderItem={({ item }) =>
        item.profiles && <FollowBox profile={item.profiles} />
      }
      estimatedItemSize={100}
      contentContainerStyle={{ padding: spacing[4] }}
      ListEmptyComponent={
        <EmptyFollowersList
          isLoading={isLoading}
          text="You don't follow anyone yet 🤔"
          refetch={refetch}
          isLoadingError={isLoadingError}
        />
      }
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <VerticalSpacing size={5} />}
      ListFooterComponent={
        <InfiniteScrollFooter
          isFetchNextPageError={isFetchNextPageError}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
          message="Failed to load more followers"
        />
      }
    />
  );
};

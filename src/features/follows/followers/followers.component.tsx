import { spacing } from "@/src/constants/spacing.constants";
import { useGetInfiniteFollowers } from "@/src/services/follows/get-followers.service";
import { FlashList } from "@shopify/flash-list";
import { EmptyFollowersList } from "../empty-followers-list/empty-followers-list.component";
import { FollowBox } from "../follow-box/follow-box.component";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { InfiniteScrollFooter } from "@/src/components/infinite-scroll-footer/infinite-scroll-footer.component";

export const Followers = () => {
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
  } = useGetInfiniteFollowers(id as string);

  const followers = useMemo(() => {
    return data?.pages.flatMap((page) => page.items) ?? [];
  }, [data]);

  return (
    <FlashList
      data={followers}
      onEndReached={() => hasNextPage && fetchNextPage()}
      renderItem={({ item }) =>
        item.profiles && <FollowBox profile={item.profiles} />
      }
      estimatedItemSize={100}
      ListEmptyComponent={
        <EmptyFollowersList
          isLoading={isLoading}
          text="No followers 🤔"
          refetch={refetch}
          isLoadingError={isLoadingError}
          isFollowers
        />
      }
      contentContainerStyle={{ padding: spacing[4] }}
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

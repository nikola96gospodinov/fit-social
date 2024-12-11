import { spacing } from "@/src/constants/spacing.constants";
import { useGetInfiniteLikesForWorkout } from "@/src/services/likes/get-likes-for-workout.service";
import { FlashList } from "@shopify/flash-list";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";
import { FollowBox } from "../follows/follow-box/follow-box.component";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { LikesFooter } from "./footer/likes-footer.component";
import { useMemo } from "react";

export const LikesContent = () => {
  const { id } = useLocalSearchParams();

  const {
    data: likesData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoadingError,
    refetch,
    isFetchNextPageError,
    isLoading,
  } = useGetInfiniteLikesForWorkout(id as string);

  const likes = useMemo(() => {
    return likesData?.pages.flatMap((page) => page.items) || [];
  }, [likesData?.pages]);

  return (
    <FlashList
      data={likes}
      onEndReached={() => hasNextPage && fetchNextPage()}
      renderItem={({ item }) =>
        item.profiles && <FollowBox profile={item.profiles} />
      }
      contentContainerStyle={styles.container}
      estimatedItemSize={100}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <VerticalSpacing size={5} />}
      ListFooterComponent={
        <LikesFooter
          isLoading={isLoading}
          isError={isLoadingError}
          refetch={refetch}
          count={likes?.length}
          isFetchNextPageError={isFetchNextPageError}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
        />
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing[4],
  },
});

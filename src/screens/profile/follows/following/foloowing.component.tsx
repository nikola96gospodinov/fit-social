import { spacing } from "@/src/constants/spacing.constants";
import { useGetFollowing } from "@/src/services/follows/get-following.service";
import { FlashList } from "@shopify/flash-list";
import { EmptyFollowersList } from "../empty-followers-list/empty-followers-list.component";
import { FollowBox } from "../follow-box/follow-box.component";

export const Following = () => {
  const { data, isLoading } = useGetFollowing();

  return (
    <FlashList
      data={data ?? []}
      renderItem={({ item }) => <FollowBox follow={item} />}
      estimatedItemSize={100}
      contentContainerStyle={{ padding: spacing[4] }}
      ListEmptyComponent={
        <EmptyFollowersList
          isLoading={isLoading}
          text="You don't follow anyone yet 🤔"
        />
      }
      keyExtractor={(item) => item.id}
    />
  );
};

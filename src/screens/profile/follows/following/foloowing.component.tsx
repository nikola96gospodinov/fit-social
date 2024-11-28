import { spacing } from "@/src/constants/spacing.constants";
import { useGetFollowing } from "@/src/services/follows/get-following.service";
import { FlashList } from "@shopify/flash-list";
import { EmptyFollowersList } from "../empty-followers-list/empty-followers-list.component";
import { FollowBox } from "../../../../features/follows/follow-box/follow-box.component";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";

export const Following = () => {
  const { data, isLoading } = useGetFollowing();

  return (
    <FlashList
      data={data ?? []}
      renderItem={({ item }) =>
        item.profiles && <FollowBox profile={item.profiles} />
      }
      estimatedItemSize={100}
      contentContainerStyle={{ padding: spacing[4] }}
      ListEmptyComponent={
        <EmptyFollowersList
          isLoading={isLoading}
          text="You don't follow anyone yet 🤔"
        />
      }
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <VerticalSpacing size={5} />}
    />
  );
};

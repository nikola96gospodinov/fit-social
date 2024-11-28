import { spacing } from "@/src/constants/spacing.constants";
import { useGetFollowers } from "@/src/services/follows/get-followers.service";
import { FlashList } from "@shopify/flash-list";
import { EmptyFollowersList } from "../empty-followers-list/empty-followers-list.component";
import { FollowBox } from "../../../../features/follows/follow-box/follow-box.component";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";

export const Followers = () => {
  const { data, isLoading } = useGetFollowers();

  return (
    <FlashList
      data={data ?? []}
      renderItem={({ item }) =>
        item.profiles && <FollowBox profile={item.profiles} />
      }
      estimatedItemSize={100}
      ListEmptyComponent={
        <EmptyFollowersList isLoading={isLoading} text="No followers 🤔" />
      }
      contentContainerStyle={{ padding: spacing[4] }}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <VerticalSpacing size={5} />}
    />
  );
};

import { spacing } from "@/src/constants/spacing.constants";
import { useGetFollowers } from "@/src/services/follows/get-followers.service";
import { FlashList } from "@shopify/flash-list";
import { View } from "react-native";
import { EmptyFollowersList } from "../empty-followers-list/empty-followers-list.component";

export const Followers = () => {
  const { data, isLoading } = useGetFollowers();

  return (
    <FlashList
      data={data ?? []}
      renderItem={({ item }) => <View></View>}
      estimatedItemSize={100}
      ListEmptyComponent={
        <EmptyFollowersList isLoading={isLoading} text="No followers 🤔" />
      }
      contentContainerStyle={{ padding: spacing[4] }}
    />
  );
};

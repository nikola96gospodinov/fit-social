import { spacing } from "@/src/constants/spacing.constants";
import { useGetFollowing } from "@/src/services/follows/get-following.service";
import { FlashList } from "@shopify/flash-list";
import { View } from "react-native";
import { EmptyFollowersList } from "../empty-followers-list/empty-followers-list.component";

export const Following = () => {
  const { data, isLoading } = useGetFollowing();

  return (
    <FlashList
      data={data ?? []}
      renderItem={({ item }) => <View></View>}
      estimatedItemSize={100}
      contentContainerStyle={{ padding: spacing[4] }}
      ListEmptyComponent={
        <EmptyFollowersList
          isLoading={isLoading}
          text="You don't follow anyone yet 🤔"
        />
      }
    />
  );
};

import { spacing } from "@/src/constants/spacing.constants";
import { useGetLikesForWorkout } from "@/src/services/likes/get-likes-for-workout.service";
import { FlashList } from "@shopify/flash-list";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";
import { FollowBox } from "../follows/follow-box/follow-box.component";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { LikesFooter } from "./footer/likes-footer.component";

export const LikesContent = () => {
  const { id } = useLocalSearchParams();

  const {
    data: likes,
    isLoading,
    refetch,
    isError,
  } = useGetLikesForWorkout(id as string);

  return (
    <FlashList
      data={likes}
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
          isError={isError}
          refetch={refetch}
          count={likes?.length}
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

import { useGetWorkoutsForFeed } from "@/src/services/workout/get-workouts-for-feed.service";
import { FlashList } from "@shopify/flash-list";
import { EmptyList } from "./empty-list/empty-list.component";

export const WorkoutsList = () => {
  const { data: workouts, isLoading: workoutsLoading } =
    useGetWorkoutsForFeed();

  return (
    <FlashList
      data={workouts}
      renderItem={({ item }) => <></>}
      estimatedItemSize={100}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={<EmptyList isLoading={workoutsLoading} />}
    />
  );
};

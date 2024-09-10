import { VerticalSpacing } from "@/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ThemedText } from "@/components/ui/themed-text.component";
import { useGetInfiniteExercises } from "@/services/exercises/get-all-exercises.service";
import { groupBy } from "lodash";
import { FlatList } from "react-native";
import { useExerciseFilterStore } from "@/store/exercise-filter-store";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ExerciseBox } from "./exercise-box/exercise-box.component";
import { ThemedActivityIndicator } from "@/components/ui/themed-activity-indicator/themed-activity-indicator.component";
import { NetworkError } from "@/components/error/network-error/network-error.component";

type Props = {
  search: string;
};

export const ActiveExercises = ({ search }: Props) => {
  const insets = useSafeAreaInsets();

  const { bodyPartFilters, equipmentFilters, targetFilters } =
    useExerciseFilterStore();

  const {
    data: exercises,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoadingError,
    refetch,
    isFetchNextPageError,
    isLoading,
  } = useGetInfiniteExercises({
    search,
    bodyPartFilters,
    equipmentFilters,
    targetFilters,
  });

  const allExercises = exercises?.pages.flatMap((page) => page.data) || [];

  const groupedAlphabetically = groupBy(allExercises, (exercise) =>
    exercise.name[0].toUpperCase()
  );

  if (isLoading) {
    return <ThemedActivityIndicator />;
  }

  if (isLoadingError) {
    return (
      <NetworkError message="Failed to fetch exercises" refetch={refetch} />
    );
  }

  return (
    <FlatList
      data={Object.entries(groupedAlphabetically).map(([key, value]) => ({
        key,
        value,
      }))}
      style={{ marginBottom: insets.bottom }}
      onEndReached={() => hasNextPage && fetchNextPage()}
      renderItem={({ item }) => {
        return (
          <>
            <ThemedText type="small" color="supporting">
              {item.key} {/* this is the letter */}
            </ThemedText>

            <VerticalSpacing size={0.5} />

            <FlatList
              data={item.value}
              renderItem={({ item: exercise }) => {
                return <ExerciseBox exercise={exercise} />;
              }}
            />

            {!isFetchingNextPage && <VerticalSpacing size={6} />}
          </>
        );
      }}
      ListFooterComponent={() => {
        if (isFetchNextPageError) {
          return (
            <>
              <NetworkError
                message="Failed to fetch more exercises"
                refetch={fetchNextPage}
              />

              <VerticalSpacing size={10} />
            </>
          );
        }

        return (
          isFetchingNextPage && (
            <>
              <ThemedActivityIndicator />

              <VerticalSpacing size={10} />
            </>
          )
        );
      }}
    />
  );
};

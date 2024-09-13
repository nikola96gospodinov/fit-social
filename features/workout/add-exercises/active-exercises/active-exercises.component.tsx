import { VerticalSpacing } from "@/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ThemedText } from "@/components/ui/themed-text/themed-text.component";
import { useGetInfiniteExercises } from "@/services/exercises/get-all-exercises.service";
import { groupBy } from "lodash";
import { FlatList } from "react-native";
import { useExerciseFilterStore } from "@/store/exercise-filter-store";
import { ExerciseBox } from "./exercise-box/exercise-box.component";
import { ThemedActivityIndicator } from "@/components/ui/themed-activity-indicator/themed-activity-indicator.component";
import { NetworkError } from "@/components/error/network-error/network-error.component";
import { Exercise } from "@/types/api/exercise.types";
import {
  BODY_PART,
  EQUIPMENT,
  TARGET_MUSCLE,
} from "@/constants/workout.constants";

type Props = {
  search: string;
  selectedExercises: Exercise[];
  setSelectedExercises: React.Dispatch<React.SetStateAction<Exercise[]>>;
};

export const ActiveExercises = ({
  search,
  selectedExercises,
  setSelectedExercises,
}: Props) => {
  const { getFilterValues } = useExerciseFilterStore();

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
    bodyPartFilters: getFilterValues(BODY_PART),
    equipmentFilters: getFilterValues(EQUIPMENT),
    targetFilters: getFilterValues(TARGET_MUSCLE),
  });

  const allExercises = exercises?.pages.flatMap((page) => page.data) || [];

  const groupedAlphabetically = groupBy(allExercises, (exercise) =>
    exercise.name[0].toUpperCase(),
  );

  if (isLoading) {
    return <ThemedActivityIndicator />;
  }

  if (isLoadingError) {
    return (
      <NetworkError message="Failed to fetch exercises" refetch={refetch} />
    );
  }

  if (allExercises.length === 0) {
    return (
      <ThemedText color="supporting" style={{ textAlign: "center" }}>
        No exercises found based on your filters
      </ThemedText>
    );
  }

  return (
    <FlatList
      data={Object.entries(groupedAlphabetically).map(([key, value]) => ({
        key,
        value,
      }))}
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
                return (
                  <ExerciseBox
                    exercise={exercise}
                    selectedExercises={selectedExercises}
                    setSelectedExercises={setSelectedExercises}
                  />
                );
              }}
            />

            {!isFetchingNextPage && <VerticalSpacing size={6} />}
          </>
        );
      }}
      ListFooterComponent={() => (
        <ListFooterComponent
          isFetchNextPageError={isFetchNextPageError}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
        />
      )}
    />
  );
};

const ListFooterComponent: React.FC<{
  isFetchNextPageError: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}> = ({ isFetchNextPageError, isFetchingNextPage, fetchNextPage }) => {
  if (isFetchNextPageError) {
    return (
      <>
        <NetworkError
          message="Failed to fetch more exercises"
          refetch={fetchNextPage}
        />
        <VerticalSpacing size={4} />
      </>
    );
  }

  if (isFetchingNextPage) {
    return (
      <>
        <ThemedActivityIndicator />
        <VerticalSpacing size={4} />
      </>
    );
  }

  return null;
};

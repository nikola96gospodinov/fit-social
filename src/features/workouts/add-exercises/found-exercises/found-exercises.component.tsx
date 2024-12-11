import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { useGetInfiniteExercises } from "@/src/services/exercises/get-all-exercises.service";
import { useExerciseFilterStore } from "@/src/store/exercise-filter-store";
import { ExerciseBox } from "./exercise-box/exercise-box.component";
import { ThemedActivityIndicator } from "@/src/components/ui/themed-activity-indicator/themed-activity-indicator.component";
import { NetworkError } from "@/src/components/error/network-error/network-error.component";
import { Exercise } from "@/src/types/api/exercise.types";
import {
  BODY_PART,
  EQUIPMENT,
  TARGET_MUSCLE,
} from "@/src/constants/workout.constants";
import { useDebounce } from "@/src/hooks/use-debounce";
import { FlashList } from "@shopify/flash-list";
import { InfiniteScrollFooter } from "@/src/components/infinite-scroll-footer/infinite-scroll-footer.component";

type Props = {
  selectedExercises: Exercise[];
  setSelectedExercises: React.Dispatch<React.SetStateAction<Exercise[]>>;
};

export const FoundExercises = ({
  selectedExercises,
  setSelectedExercises,
}: Props) => {
  const { getFilterValues, activeSearch } = useExerciseFilterStore();

  const debouncedActiveSearch = useDebounce<string>({ value: activeSearch });

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
    search: debouncedActiveSearch,
    bodyPartFilters: getFilterValues(BODY_PART),
    equipmentFilters: getFilterValues(EQUIPMENT),
    targetFilters: getFilterValues(TARGET_MUSCLE),
  });

  const allExercises = exercises?.pages.flatMap((page) => page.data) || [];

  const exercisesWithHeaders = allExercises.reduce(
    (acc, exercise) => {
      const letter = exercise.name.charAt(0).toUpperCase();

      // Add letter header if this is the first exercise for this letter
      if (!acc.some((item) => item === letter)) {
        acc.push(letter);
      }
      acc.push(exercise);
      return acc;
    },
    [] as (string | Exercise)[],
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
    <FlashList
      data={exercisesWithHeaders}
      onEndReached={() => hasNextPage && fetchNextPage()}
      renderItem={({ item, index }) => {
        if (typeof item === "string")
          return <LetterHeader letter={item} index={index} />;

        return (
          <ExerciseBox
            exercise={item}
            selectedExercises={selectedExercises}
            setSelectedExercises={setSelectedExercises}
          />
        );
      }}
      ListFooterComponent={() => (
        <InfiniteScrollFooter
          isFetchNextPageError={isFetchNextPageError}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
          message="Failed to fetch more exercises"
        />
      )}
      getItemType={(item) => {
        return typeof item === "string" ? "sectionHeader" : "row";
      }}
      estimatedItemSize={1000}
    />
  );
};

const LetterHeader = ({ letter, index }: { letter: string; index: number }) => {
  return (
    <>
      {index !== 0 && <VerticalSpacing size={3} />}

      <ThemedText type="small" color="supporting">
        {letter}
      </ThemedText>
    </>
  );
};

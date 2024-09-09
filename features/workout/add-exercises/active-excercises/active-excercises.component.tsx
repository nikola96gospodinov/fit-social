import { VerticalSpacing } from "@/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ThemedText } from "@/components/ui/themed-text.component";
import { useGetExercises } from "@/services/exercises/get-all-exercises.service";
import { groupBy } from "lodash";
import { FlatList } from "react-native";
import { useExerciseFilterStore } from "@/store/exercise-filter-store";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ExerciseBox } from "./exercise-box/exercise-box.component";

type Props = {
  search: string;
};

export const ActiveExercises = ({ search }: Props) => {
  const insets = useSafeAreaInsets();

  const { bodyPartFilters, equipmentFilters, targetFilters } =
    useExerciseFilterStore();

  const { data: exercises } = useGetExercises({
    search,
    bodyPartFilters,
    equipmentFilters,
    targetFilters,
  });

  const groupedAlphabetically = groupBy(exercises, (exercise) =>
    exercise.name[0].toUpperCase()
  );

  return (
    <FlatList
      data={Object.entries(groupedAlphabetically).map(([key, value]) => ({
        key,
        value,
      }))}
      style={{ marginBottom: insets.bottom }}
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

            <VerticalSpacing size={6} />
          </>
        );
      }}
    />
  );
};

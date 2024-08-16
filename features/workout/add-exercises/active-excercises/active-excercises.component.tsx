import { VerticalSpacing } from "@/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ThemedText } from "@/components/ui/themed-text.component";
import { useGetExercises } from "@/services/exercises/get-all-exercises.service";
import { groupBy, capitalize } from "lodash";
import { FlatList, useColorScheme, View } from "react-native";
import { Image } from "expo-image";
import { Flex } from "@/components/ui/layout/flex/flex.component";
import { spacing } from "@/constants/spacing.constants";
import { colors } from "@/constants/colors.constants";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useExerciseFilterStore } from "@/store/exercise-filter-store";

type Props = {
  search: string;
};

export const ActiveExercises = ({ search }: Props) => {
  const theme = useColorScheme() ?? "light";

  const { bodyPartFilters, equipmentFilters, targetMuscleFilters } =
    useExerciseFilterStore();

  const { data: exercises } = useGetExercises({});

  const filteredExercises = exercises?.filter((exercise) => {
    if (!exercise.name.includes(search.toLowerCase())) return false;

    if (bodyPartFilters.length && !bodyPartFilters.includes(exercise.bodyPart))
      return false;

    if (
      equipmentFilters.length &&
      !equipmentFilters.includes(exercise.equipment)
    )
      return false;

    if (
      targetMuscleFilters.length &&
      !targetMuscleFilters.includes(exercise.target)
    )
      return false;

    return true;
  });

  const groupedAlphabetically = groupBy(filteredExercises, (exercise) =>
    exercise.name[0].toUpperCase()
  );

  return (
    <FlatList
      data={Object.entries(groupedAlphabetically).map(([key, value]) => ({
        key,
        value,
      }))}
      renderItem={({ item }) => {
        return (
          <>
            <ThemedText type="small" color="supporting">
              {item.key}
            </ThemedText>

            <VerticalSpacing size={0.5} />

            <FlatList
              data={item.value}
              renderItem={({ item: exercise }) => {
                return (
                  <>
                    <Flex
                      direction="row"
                      align="center"
                      gap={spacing[1]}
                      style={{ paddingVertical: spacing[2] }}
                    >
                      <Image
                        source={{ uri: exercise.gifUrl }}
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 100,
                        }}
                      />

                      <Flex>
                        <ThemedText>{capitalize(exercise.name)}</ThemedText>
                        <ThemedText type="small" color="supporting">
                          {exercise.target}
                        </ThemedText>
                      </Flex>

                      <FontAwesome6
                        name="question"
                        size={20}
                        color={colors[theme].icon}
                      />
                    </Flex>
                  </>
                );
              }}
            />

            <VerticalSpacing size={4} />
          </>
        );
      }}
    />
  );
};

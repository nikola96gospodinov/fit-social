import { VerticalSpacing } from "@/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ThemedText } from "@/components/ui/themed-text.component";
import { useGetExercises } from "@/services/exercises/get-all-exercises.service";
import { groupBy, capitalize } from "lodash";
import { FlatList, Pressable, useColorScheme } from "react-native";
import { Image } from "expo-image";
import { Flex } from "@/components/ui/layout/flex/flex.component";
import { spacing } from "@/constants/spacing.constants";
import { colors } from "@/constants/colors.constants";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useExerciseFilterStore } from "@/store/exercise-filter-store";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";
import { Exercise } from "@/types/api/exercise.types";

type Props = {
  search: string;
};

export const ActiveExercises = ({ search }: Props) => {
  const theme = useColorScheme() ?? "light";

  const insets = useSafeAreaInsets();

  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);

  const onExercisePress = (exercise: Exercise) => {
    const isSelected = selectedExercises.find(({ id }) => id === exercise.id);

    if (isSelected) {
      setSelectedExercises(
        selectedExercises.filter(({ id }) => id !== exercise.id)
      );
    } else {
      setSelectedExercises([...selectedExercises, exercise]);
    }
  };

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
              {item.key}
            </ThemedText>

            <VerticalSpacing size={0.5} />

            <FlatList
              data={item.value}
              renderItem={({ item: exercise }) => {
                const isSelected = !!selectedExercises.find(
                  ({ id }) => id === exercise.id
                );

                return (
                  <Pressable
                    onPress={() => onExercisePress(exercise)}
                    style={{
                      backgroundColor: isSelected
                        ? colors[theme].background
                        : "transparent",
                      borderRadius: 16,
                      paddingLeft: spacing[3],
                    }}
                  >
                    <Flex
                      direction="row"
                      justify="space-between"
                      align="center"
                      gap={spacing[1]}
                      style={{ paddingVertical: spacing[3] }}
                    >
                      <Flex
                        direction="row"
                        gap={spacing[1]}
                        style={{ flexShrink: 1 }}
                      >
                        <Image
                          source={{ uri: exercise.gifUrl }}
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: 100,
                          }}
                        />

                        <Flex style={{ flexShrink: 1, gap: spacing[0.5] }}>
                          <ThemedText>{capitalize(exercise.name)}</ThemedText>
                          <ThemedText type="small" color="supporting">
                            {exercise.target}
                          </ThemedText>
                        </Flex>
                      </Flex>

                      <Pressable
                        style={{
                          marginRight: spacing[3],
                          backgroundColor: isSelected
                            ? colors[theme].border
                            : colors[theme].background,
                          width: 32,
                          height: 32,
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 100,
                        }}
                      >
                        <FontAwesome6
                          name="question"
                          size={18}
                          color={colors[theme].icon}
                        />
                      </Pressable>
                    </Flex>
                  </Pressable>
                );
              }}
            />

            <VerticalSpacing size={6} />
          </>
        );
      }}
    />
  );
};

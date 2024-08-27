import { VerticalSpacing } from "@/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ThemedText } from "@/components/ui/themed-text.component";
import { useGetExercises } from "@/services/exercises/get-all-exercises.service";
import { groupBy, capitalize } from "lodash";
import { FlatList, useColorScheme } from "react-native";
import { Image } from "expo-image";
import { Flex } from "@/components/ui/layout/flex/flex.component";
import { spacing } from "@/constants/spacing.constants";
import { colors } from "@/constants/colors.constants";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useExerciseFilterStore } from "@/store/exercise-filter-store";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  search: string;
};

export const ActiveExercises = ({ search }: Props) => {
  const theme = useColorScheme() ?? "light";

  const insets = useSafeAreaInsets();

  const { bodyPartFilters, equipmentFilters, targetFilters } =
    useExerciseFilterStore();

  const { data: exercises } = useGetExercises({
    search,
    bodyPartFilters,
    equipmentFilters,
    targetFilters,
  });

  // TODO: Might have to move on server level
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
                return (
                  <>
                    <Flex
                      direction="row"
                      align="center"
                      justify="space-between"
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

                        <Flex style={{ flexShrink: 1 }}>
                          <ThemedText>{capitalize(exercise.name)}</ThemedText>
                          <ThemedText type="small" color="supporting">
                            {exercise.target}
                          </ThemedText>
                        </Flex>
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

            <VerticalSpacing size={6} />
          </>
        );
      }}
    />
  );
};

import { PaddedScrollView } from "@/components/ui/layout/padded-scroll-view/padded-scroll-view.component";
import { Flex } from "@/components/ui/layout/flex/flex.component";
import { VerticalSpacing } from "@/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { Pill } from "@/components/ui/pill/pill.component";
import { ThemedActivityIndicator } from "@/components/ui/themed-activity-indicator/themed-activity-indicator.component";
import { ThemedText } from "@/components/ui/themed-text/themed-text.component";
import { ULItem } from "@/components/ui/ul-item/ul-item.component";
import { colors } from "@/constants/colors.constants";
import { spacing } from "@/constants/spacing.constants";
import { useGetExerciseById } from "@/services/exercises/get-exercise-by-id.service";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { capitalize } from "lodash";
import { useEffect } from "react";
import {
  FlatList,
  Image,
  useColorScheme,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";

const Exercise = () => {
  const { id } = useLocalSearchParams();

  const theme = useColorScheme() ?? "light";

  const navigation = useNavigation();

  const windowWidth = Dimensions.get("window").width;

  const { data: exercise, isLoading } = useGetExerciseById(String(id));

  useEffect(() => {
    if (exercise) {
      navigation.setOptions({
        title: `${capitalize(exercise.name)} (${exercise.bodyPart})`,
      });
    }

    if (!isLoading && !exercise) {
      navigation.setOptions({ title: "Exercise not found" });
    }
  }, [exercise, isLoading, navigation]);

  if (isLoading) {
    return <ThemedActivityIndicator />;
  }

  if (!exercise) {
    return <ThemedText>Exercise not found</ThemedText>;
  }

  return (
    <PaddedScrollView>
      <View
        style={[
          styles.imageContainer,
          {
            borderColor: colors[theme].border,
          },
        ]}>
        <Image
          source={{ uri: exercise.gifUrl }}
          style={[
            styles.image,
            {
              height: windowWidth - spacing[4] * 2,
            },
          ]}
        />

        <View
          style={[
            styles.equipmentContainer,
            {
              backgroundColor: colors[theme].border,
            },
          ]}>
          <ThemedText type="small">{exercise.equipment}</ThemedText>
        </View>
      </View>

      <VerticalSpacing size={4} />

      <Flex direction="row" gap={2} align="center">
        <Pill label={exercise.target} isActive />

        {exercise.secondaryMuscles.map((muscle) => (
          <Pill key={muscle} label={muscle} isActive={false} />
        ))}
      </Flex>

      <VerticalSpacing size={6} />

      <View
        style={[
          styles.instructionsContainer,
          {
            borderColor: colors[theme].border,
            backgroundColor: colors[theme].background,
          },
        ]}>
        <ThemedText style={{ fontWeight: "bold" }}>Instructions:</ThemedText>

        <VerticalSpacing size={2} />

        <FlatList
          ItemSeparatorComponent={() => <VerticalSpacing size={0.5} />}
          nestedScrollEnabled={true}
          scrollEnabled={false}
          data={exercise.instructions}
          renderItem={({ item }) => <ULItem text={item} />}
          contentContainerStyle={styles.flatListContainer}
        />
      </View>

      <VerticalSpacing size={10} />
    </PaddedScrollView>
  );
};

export default Exercise;

const styles = StyleSheet.create({
  instructionsContainer: {
    borderWidth: 1,
    padding: 16,
    borderRadius: 8,
  },

  image: {
    width: "100%",
  },

  imageContainer: {
    borderWidth: 1,
    borderRadius: 8,
    overflow: "hidden",
  },

  flatListContainer: {
    paddingHorizontal: 12,
    paddingBottom: 4,
  },

  equipmentContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    paddingVertical: spacing[1],
    paddingHorizontal: spacing[3],
    borderTopLeftRadius: 8,
  },
});

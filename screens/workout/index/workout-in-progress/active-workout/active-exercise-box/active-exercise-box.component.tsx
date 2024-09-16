import { Flex } from "@/components/ui/layout/flex/flex.component";
import { VerticalSpacing } from "@/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ThemedButton } from "@/components/ui/themed-button/themed-button.component";
import { ThemedText } from "@/components/ui/themed-text/themed-text.component";
import { colors } from "@/constants/colors.constants";
import { spacing } from "@/constants/spacing.constants";
import { ActiveExercise } from "@/types/workout.types";
import { capitalize, isEmpty } from "lodash";
import { Pressable, StyleSheet, useColorScheme, View } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useActiveWorkoutStore } from "@/store/active-workout-store";

type Props = {
  exercise: ActiveExercise;
};

export const ActiveExerciseBox = ({ exercise }: Props) => {
  const theme = useColorScheme() ?? "light";

  const { removeExercise } = useActiveWorkoutStore();

  return (
    <View
      style={[
        {
          backgroundColor: colors[theme].fillTextColor,
          borderColor: colors[theme].border,
        },
        styles.container,
      ]}>
      <Flex
        direction="row"
        justify="space-between"
        align="center"
        gap={2}
        style={{ flex: 1 }}>
        <View
          style={[
            {
              backgroundColor: colors[theme].borderFocused,
            },
            styles.exerciseNameContainer,
          ]}>
          <ThemedText
            color={theme === "light" ? "defaultInverted" : "default"}
            style={{ fontWeight: "bold" }}>
            {capitalize(exercise.name)}
          </ThemedText>
        </View>
      </Flex>

      <VerticalSpacing size={4} />

      {isEmpty(exercise.sets) && (
        <ThemedText type="small" color="supporting" isCentered>
          No sets added yet
        </ThemedText>
      )}

      <VerticalSpacing size={4} />

      <ThemedButton text="Add a set" variant="flat" isCentered />

      <Pressable
        style={styles.trashIconContainer}
        onPress={() => removeExercise(exercise.id)}>
        <FontAwesome6
          name="trash"
          size={16}
          color={colors[theme].destructiveIcon}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing[3],
    paddingTop: 0,
    borderRadius: spacing[3],
    borderWidth: 1,
  },

  exerciseNameContainer: {
    marginLeft: -(spacing[3] + 1),
    marginTop: -1,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1],
    borderTopLeftRadius: spacing[3],
    borderBottomRightRadius: spacing[3],
  },

  trashIconContainer: {
    position: "absolute",
    right: spacing[3],
    bottom: spacing[3],
  },
});

import { OrSeparator } from "@/components/or-separator/or-separator.component";
import { VerticalSpacing } from "@/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ThemedButton } from "@/components/ui/themed-button/themed-button.component";
import { ThemedText } from "@/components/ui/themed-text/themed-text.component";
import { spacing } from "@/constants/spacing.constants";
import { useActiveWorkoutStore } from "@/store/active-workout-store";
import { useRouter } from "expo-router";
import { capitalize, isEmpty } from "lodash";
import { View, FlatList, StyleSheet, useColorScheme } from "react-native";
import { colors } from "@/constants/colors.constants";
import { Flex } from "@/components/ui/layout/flex/flex.component";

export const ActiveWorkout = () => {
  const theme = useColorScheme() ?? "light";

  const { exercises } = useActiveWorkoutStore();

  const router = useRouter();

  return (
    <View style={styles.container}>
      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id}
        renderItem={({ item: exercise }) => (
          <View
            style={{
              backgroundColor: colors[theme].fillTextColor,
              padding: spacing[3],
              paddingTop: 0,
              borderRadius: spacing[3],
              borderWidth: 1,
              borderColor: colors[theme].border,
            }}>
            <Flex
              direction="row"
              justify="space-between"
              align="center"
              gap={2}
              style={{ flex: 1 }}>
              <View
                style={{
                  backgroundColor: colors[theme].borderFocused,
                  marginLeft: -(spacing[3] + 1),
                  marginTop: -1,
                  paddingHorizontal: spacing[3],
                  paddingVertical: spacing[1],
                  borderTopLeftRadius: spacing[3],
                  borderBottomRightRadius: spacing[3],
                }}>
                <ThemedText
                  color={theme === "light" ? "defaultInverted" : "default"}
                  style={{ fontWeight: "bold" }}>
                  {capitalize(exercise.name)}
                </ThemedText>
              </View>
            </Flex>

            <VerticalSpacing size={4} />

            {isEmpty(exercise.sets) && (
              <ThemedText
                type="small"
                color="supporting"
                style={{ alignSelf: "center" }}>
                No sets added yet
              </ThemedText>
            )}

            <VerticalSpacing size={4} />

            <ThemedButton
              text="Add a set"
              variant="flat"
              style={{ alignSelf: "center" }}
            />
          </View>
        )}
        ListFooterComponent={() => (
          <View style={styles.ctaContainer}>
            <ThemedButton
              text="Add exercise(s)"
              onPress={() => router.push("/workout/add-exercise")}
              size="sm"
            />

            <VerticalSpacing size={2} />

            <OrSeparator textType="small" />

            <VerticalSpacing size={2} />

            <ThemedButton text="Cancel workout" variant="error" size="sm" />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing[4],
    flex: 1,
    paddingBottom: 0,
  },

  ctaContainer: {
    marginTop: spacing[4],
    justifyContent: "center",
    alignItems: "center",
  },
});

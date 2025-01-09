import { Flex } from "@/src/components/ui/layout/flex/flex.component";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { colors } from "@/src/constants/colors.constants";
import { spacing } from "@/src/constants/spacing.constants";
import { MEASUREMENT_TYPE } from "@/src/constants/workout.constants";
import { METRIC } from "@/src/screens/profile/edit/edit-profile-form/edit-profile-form.schema";
import { useGetProfile } from "@/src/services/profile/get-profile.service";
import { ActiveExercise } from "@/src/store/active-workout-store";
import { StyleSheet, useColorScheme } from "react-native";

type Props = {
  measurementType: ActiveExercise["measurement_type"];
};

const WEIGHT_DISPLAY = "weight";
const REPS_DISPLAY = "reps";
const TIME_DISPLAY = "time";
const DISTANCE_DISPLAY = "distance";

const MEASUREMENT_TYPE_DISPLAYS = {
  [MEASUREMENT_TYPE.REPS_AND_ADDED_WEIGHT]: [WEIGHT_DISPLAY, REPS_DISPLAY],
  [MEASUREMENT_TYPE.REPS_AND_SUBTRACTED_WEIGHT]: [WEIGHT_DISPLAY, REPS_DISPLAY],
  [MEASUREMENT_TYPE.TIME_AND_ADDED_WEIGHT]: [WEIGHT_DISPLAY, TIME_DISPLAY],
  [MEASUREMENT_TYPE.REPS_ONLY]: [REPS_DISPLAY],
  [MEASUREMENT_TYPE.TIME_ONLY]: [TIME_DISPLAY],
  [MEASUREMENT_TYPE.TIME_AND_DISTANCE]: [TIME_DISPLAY, DISTANCE_DISPLAY],
};

export const SetsListHeader = ({ measurementType }: Props) => {
  const theme = useColorScheme() ?? "light";

  const { data: profile } = useGetProfile();

  const displayFields = MEASUREMENT_TYPE_DISPLAYS[measurementType] ?? [];
  const showWeight = displayFields.includes(WEIGHT_DISPLAY);
  const showReps = displayFields.includes(REPS_DISPLAY);
  const showTime = displayFields.includes(TIME_DISPLAY);
  const showDistance = displayFields.includes(DISTANCE_DISPLAY);

  const weightUnit = profile?.measurement_system === METRIC ? "kg" : "lbs";
  const weightDisplay =
    measurementType === MEASUREMENT_TYPE.REPS_AND_SUBTRACTED_WEIGHT ? "- " : "";
  const distanceUnit = profile?.measurement_system === METRIC ? "km" : "mi";

  return (
    <>
      <Flex
        direction="row"
        align="center"
        style={[
          styles.container,
          {
            borderBottomColor: colors[theme].border,
          },
        ]}>
        <Flex style={{ width: 32 }}>
          <ThemedText type="small" color="supporting">
            #
          </ThemedText>
        </Flex>

        <Flex style={{ width: 64 }}>
          <ThemedText type="small" color="supporting">
            last
          </ThemedText>
        </Flex>

        <Flex direction="row" align="center" gap={6}>
          {showWeight && (
            <Flex align="center" style={{ width: 64 }}>
              <ThemedText type="small" color="supporting">
                {weightDisplay}
                {weightUnit}
              </ThemedText>
            </Flex>
          )}

          {showReps && (
            <Flex
              align="center"
              style={{ width: displayFields.length > 1 ? 64 : 128 }}>
              <ThemedText type="small" color="supporting">
                reps
              </ThemedText>
            </Flex>
          )}

          {showTime && (
            <Flex
              align="center"
              style={{ width: displayFields.length > 1 ? 64 : 128 }}>
              <ThemedText type="small" color="supporting">
                time
              </ThemedText>
            </Flex>
          )}

          {showDistance && (
            <Flex align="center" style={{ width: 64 }}>
              <ThemedText type="small" color="supporting">
                {distanceUnit}
              </ThemedText>
            </Flex>
          )}
        </Flex>
      </Flex>

      <VerticalSpacing size={2} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing[3],
    paddingBottom: spacing[2],
    borderBottomWidth: 1,
  },
});

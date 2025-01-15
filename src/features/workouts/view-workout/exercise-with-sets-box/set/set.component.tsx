import { useColorScheme, View, StyleSheet } from "react-native";
import { Enums, Tables } from "@/src/types/database.types";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { useGetProfile } from "@/src/services/profile/get-profile.service";
import { METRIC } from "@/src/screens/profile/edit/edit-profile-form/edit-profile-form.schema";
import { Flex } from "@/src/components/ui/layout/flex/flex.component";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { colors } from "@/src/constants/colors.constants";
import { spacing } from "@/src/constants/spacing.constants";
import { getSummaryTextOfSet } from "../../../utils/get-summary-text-of-set.utils";
import { MEASUREMENT_TYPE } from "@/src/constants/workout.constants";

type Props = {
  set: Tables<"exercise_sets">;
  index: number;
  isLast: boolean;
  isPR?: boolean;
  isBestSet?: boolean;
  measurementType?: Enums<"exercise_measurement_type">;
};

export const Set = ({
  set,
  index,
  isLast,
  isPR,
  isBestSet,
  measurementType,
}: Props) => {
  const { data: profile } = useGetProfile();

  const theme = useColorScheme() ?? "light";

  const measurementSystem =
    profile?.measurement_system === METRIC ? "kg" : "lbs";
  const distanceUnit = profile?.measurement_system === METRIC ? "km" : "mi";

  const oneMaxRep = (() => {
    if (!set.weight || !set.reps) return 0;
    if (set.reps === 1) return set.weight;
    return (set.weight * (1 + set.reps / 30)).toFixed();
  })();

  const pace = (() => {
    if (!set.distance || !set.time) return "0:00";

    const secondsPerUnit = set.time / set.distance;

    const minutes = Math.floor(secondsPerUnit / 60);
    const seconds = Math.floor(secondsPerUnit % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  })();

  const summary = (() => {
    if (measurementType === MEASUREMENT_TYPE.TIME_AND_DISTANCE)
      return ` ${pace} / ${distanceUnit}`;

    if (measurementType === MEASUREMENT_TYPE.REPS_AND_ADDED_WEIGHT)
      return ` ${oneMaxRep} ${measurementSystem}`;

    return "";
  })();

  const pillStyle = (() => {
    if (isPR) {
      return [styles.pill, { backgroundColor: colors[theme].tintBackground }];
    }

    if (isBestSet) {
      return [
        styles.pill,
        { backgroundColor: colors[theme].oppositeBackground },
      ];
    }

    return [];
  })();

  const textColor = (() => {
    if (isPR) return theme === "dark" ? "default" : "inverted";
    if (isBestSet) return "inverted";
    return "supporting";
  })();

  const text = getSummaryTextOfSet({
    set,
    measurementSystem: profile?.measurement_system,
    measurementType,
  });

  return (
    <View key={set.id}>
      <Flex direction="row" justify="space-between">
        <ThemedText type="extraSmall" color="supporting">
          {index + 1}.{"   "}
          {text}
        </ThemedText>

        {set.weight === 0 ? (
          <ThemedText type="extraSmall" color="supporting">
            -
          </ThemedText>
        ) : (
          <Flex direction="row" gap={1} style={pillStyle} align="center">
            {isPR && <PersonalRecord />}

            <ThemedText type="extraSmall" color={textColor}>
              {isBestSet && !isPR && (
                <FontAwesome
                  name="star"
                  size={12}
                  color={colors[theme].invertedText}
                />
              )}
              {summary}
            </ThemedText>
          </Flex>
        )}
      </Flex>

      {!isLast && <VerticalSpacing size={0.5} />}
    </View>
  );
};

const PersonalRecord = () => {
  const theme = useColorScheme() ?? "light";

  return (
    <Flex direction="row" gap={1} align="center">
      <Ionicons name="trophy" size={12} color={colors.dark.textIcon} />

      <ThemedText
        type="extraSmall"
        color={theme === "dark" ? "default" : "inverted"}>
        PR
      </ThemedText>
    </Flex>
  );
};

const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: spacing[2],
    borderRadius: 12,
    transform: [{ translateX: spacing[2] }],
  },
});

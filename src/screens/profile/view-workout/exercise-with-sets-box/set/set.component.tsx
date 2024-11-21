import { useColorScheme, View, StyleSheet } from "react-native";
import { Tables } from "@/src/types/database.types";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { useGetProfile } from "@/src/services/profile/get-profile.service";
import { METRIC } from "../../../edit/edit-profile-form/edit-profile-form.schema";
import { Flex } from "@/src/components/ui/layout/flex/flex.component";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/src/constants/colors.constants";
import { spacing } from "@/src/constants/spacing.constants";

type Props = {
  set: Tables<"exercise_sets">;
  index: number;
  isLast: boolean;
  isPR?: boolean;
};

export const Set = ({ set, index, isLast, isPR }: Props) => {
  const { data: profile } = useGetProfile();

  const theme = useColorScheme() ?? "light";

  const measurementSystem =
    profile?.measurement_system === METRIC ? "kg" : "lbs";

  const oneMaxRep = (() => {
    if (!set.weight || !set.reps) return 0;
    if (set.reps === 1) return set.weight;
    return (set.weight * (1 + set.reps / 30)).toFixed();
  })();

  return (
    <View key={set.id}>
      <Flex direction="row" justify="space-between">
        <ThemedText type="extraSmall" color="supporting">
          {index + 1}.{"   "}
          {set.weight} {measurementSystem} x {set.reps}
        </ThemedText>

        <Flex
          direction="row"
          gap={2}
          style={
            isPR
              ? [styles.pill, { backgroundColor: colors[theme].tintBackground }]
              : []
          }>
          {isPR && <PRPill />}

          <ThemedText type="extraSmall" color={isPR ? "default" : "supporting"}>
            {oneMaxRep} {measurementSystem}
          </ThemedText>
        </Flex>
      </Flex>

      {!isLast && <VerticalSpacing size={0.5} />}
    </View>
  );
};

const PRPill = () => {
  const theme = useColorScheme() ?? "light";

  return (
    <Flex direction="row" gap={1} align="center">
      <Ionicons name="trophy" size={12} color={colors[theme].textIcon} />

      <ThemedText type="extraSmall">PR</ThemedText>
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

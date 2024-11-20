import { View } from "react-native";
import { Tables } from "@/src/types/database.types";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { useGetProfile } from "@/src/services/profile/get-profile.service";
import { METRIC } from "../../../edit/edit-profile-form/edit-profile-form.schema";
import { Flex } from "@/src/components/ui/layout/flex/flex.component";

type Props = {
  set: Tables<"exercise_sets">;
  index: number;
  isLast: boolean;
};

export const Set = ({ set, index, isLast }: Props) => {
  const { data: profile } = useGetProfile();

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

        <ThemedText type="extraSmall" color="supporting">
          {oneMaxRep} {measurementSystem}
        </ThemedText>
      </Flex>

      {!isLast && <VerticalSpacing size={0.5} />}
    </View>
  );
};

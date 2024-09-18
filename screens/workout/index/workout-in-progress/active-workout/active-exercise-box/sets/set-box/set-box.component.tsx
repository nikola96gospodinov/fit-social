import { Flex } from "@/components/ui/layout/flex/flex.component";
import { ThemedTextInput } from "@/components/ui/themed-text-input/themed-text-input.component";
import { ThemedText } from "@/components/ui/themed-text/themed-text.component";
import { colors } from "@/constants/colors.constants";
import { useActiveWorkoutStore } from "@/store/active-workout-store";
import { ExerciseSet } from "@/types/workout.types";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Pressable, useColorScheme } from "react-native";

type Props = {
  set: ExerciseSet;
  index: number;
  exerciseId: string;
};

export const SetBox = ({ set, index, exerciseId }: Props) => {
  const { updateSet } = useActiveWorkoutStore();

  const theme = useColorScheme() ?? "light";

  return (
    <Flex direction="row" align="center" gap={4}>
      <ThemedText>{index + 1}.</ThemedText>

      <Flex direction="row" align="center" gap={2} style={{ flex: 1 }}>
        <ThemedTextInput
          value={set.reps ? set.reps.toString() : ""}
          keyboardType="numeric"
          width={60}
          onChangeText={(text) =>
            updateSet({ exerciseId, setId: set.id, reps: Number(text) })
          }
        />

        <ThemedText>x</ThemedText>

        <ThemedTextInput
          value={set.weight ? set.weight.toString() : ""}
          keyboardType="numeric"
          width={60}
          onChangeText={(text) =>
            updateSet({ exerciseId, setId: set.id, weight: Number(text) })
          }
        />
      </Flex>

      <Pressable
        onPress={() =>
          updateSet({ exerciseId, setId: set.id, isDone: !set.isDone })
        }>
        {/* For some reason dynamically changing the name and color of one icon is causing huge performance issues */}
        {set.isDone ? (
          <FontAwesome
            name="check-square"
            size={24}
            color={colors[theme].success}
          />
        ) : (
          <FontAwesome name="square-o" size={24} color={colors[theme].icon} />
        )}
      </Pressable>
    </Flex>
  );
};

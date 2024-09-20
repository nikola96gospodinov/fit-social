import { colors } from "@/constants/colors.constants";
import { spacing } from "@/constants/spacing.constants";
import { useActiveWorkoutStore } from "@/store/active-workout-store";
import { Exercise } from "@/types/api/exercise.types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, useColorScheme, StyleSheet } from "react-native";

type Props = {
  selectedExercises: Exercise[];
};

export const AddIcon = ({ selectedExercises }: Props) => {
  const theme = useColorScheme() ?? "light";

  const { addExercises } = useActiveWorkoutStore();

  const router = useRouter();

  const onPress = () => {
    addExercises(selectedExercises);
    router.push("/workout");
  };

  return (
    <Pressable
      style={[
        {
          backgroundColor: colors[theme].tintBackground,
        },
        styles.container,
      ]}
      onPress={onPress}>
      <MaterialCommunityIcons
        name="plus"
        size={32}
        color={colors[theme].tintBackgroundText}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: spacing[4],
    right: spacing[4],
    padding: spacing[1],
    borderRadius: 100,
  },
});

import { colors } from "@/constants/colors.constants";
import { spacing } from "@/constants/spacing.constants";
import { useActiveWorkoutStore } from "@/store/active-workout-store";
import { Exercise } from "@/types/api/exercise.types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, useColorScheme } from "react-native";

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
      style={{
        position: "absolute",
        bottom: spacing[4],
        right: spacing[4],
        backgroundColor: colors[theme].tint,
        padding: spacing[1],
        borderRadius: 100,
      }}
      onPress={onPress}>
      <MaterialCommunityIcons
        name="plus"
        size={32}
        color={colors[theme].tintText}
      />
    </Pressable>
  );
};

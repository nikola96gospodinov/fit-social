import { colors } from "@/constants/colors.constants";
import { spacing } from "@/constants/spacing.constants";
import { useActiveWorkoutStore } from "@/store/active-workout-store";
import { FontAwesome6 } from "@expo/vector-icons";
import {
  Pressable,
  useColorScheme,
  StyleSheet,
  LayoutAnimation,
} from "react-native";
import { createDiscardExerciseAlert } from "./create-discard-exercie-alert";

type Props = {
  id: string;
};

export const DiscardExercise = ({ id }: Props) => {
  const theme = useColorScheme() ?? "light";

  const { removeExercise } = useActiveWorkoutStore();

  const handleDiscardExercise = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    removeExercise(id);
  };

  return (
    <Pressable
      style={styles.trashIconContainer}
      onPress={() =>
        createDiscardExerciseAlert({
          discardExercise: handleDiscardExercise,
          colorScheme: theme,
        })
      }>
      <FontAwesome6
        name="trash"
        size={16}
        color={colors[theme].destructiveIcon}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  trashIconContainer: {
    position: "absolute",
    right: spacing[3],
    bottom: spacing[3],
  },
});

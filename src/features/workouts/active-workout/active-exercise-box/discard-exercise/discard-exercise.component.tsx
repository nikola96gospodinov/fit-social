import { colors } from "@/src/constants/colors.constants";
import { spacing } from "@/src/constants/spacing.constants";
import { useActiveWorkoutStore } from "@/src/store/active-workout-store";
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

  const {
    store: { removeExercise },
  } = useActiveWorkoutStore();

  const handleDiscardExercise = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    removeExercise(id);
  };

  return (
    <Pressable
      style={[
        styles.trashIconContainer,
        { backgroundColor: colors[theme].cardBackground },
      ]}
      onPress={() =>
        createDiscardExerciseAlert({
          discardExercise: handleDiscardExercise,
          colorScheme: theme,
        })
      }>
      <FontAwesome6
        name="trash"
        size={14}
        color={colors[theme].destructiveIcon}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  trashIconContainer: {
    padding: spacing[2],
    borderRadius: 100,
  },
});

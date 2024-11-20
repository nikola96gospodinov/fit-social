import { Pressable, useColorScheme } from "react-native";
import { router } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "@/src/constants/colors.constants";
import { Tables } from "@/src/types/database.types";
import { ThemedActivityIndicator } from "@/src/components/ui/themed-activity-indicator/themed-activity-indicator.component";
import { useInitiateWorkoutState } from "../hooks/use-initiate-workout-state";

type Props = {
  workout: Tables<"workouts">;
};

export const EditWorkoutIcon = ({ workout }: Props) => {
  const theme = useColorScheme() ?? "light";

  const { isLoading, handleInitiateState } = useInitiateWorkoutState({
    workout,
  });

  const handlePress = () => {
    handleInitiateState();
    router.push(`/profile/edit-workout/${workout.id}`);
  };

  return (
    <Pressable onPress={handlePress} disabled={isLoading}>
      {isLoading ? (
        <ThemedActivityIndicator size="small" />
      ) : (
        <FontAwesome name="pencil" size={16} color={colors[theme].icon} />
      )}
    </Pressable>
  );
};

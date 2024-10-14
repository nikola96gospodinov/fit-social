import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { Tables } from "@/src/types/database.types";
import { View } from "react-native";

type Props = {
  workout: Tables<"workouts">;
};

export const PastWorkoutBox = ({ workout }: Props) => {
  return (
    <View>
      <ThemedText>{workout.id}</ThemedText>
    </View>
  );
};

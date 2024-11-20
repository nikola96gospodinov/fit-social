import { View } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";

export const ViewWorkoutContent = () => {
  const { id } = useLocalSearchParams();

  const navigation = useNavigation();

  return <View></View>;
};

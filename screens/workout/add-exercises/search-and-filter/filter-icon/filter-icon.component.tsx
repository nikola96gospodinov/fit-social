import { colors, indigo } from "@/constants/colors.constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Text,
  useColorScheme,
  View,
  StyleSheet,
  Pressable,
} from "react-native";

type Props = {
  numberOfFilters: number;
};

export const FilterIcon = ({ numberOfFilters }: Props) => {
  const colorScheme = useColorScheme() ?? "light";

  const router = useRouter();

  const count = numberOfFilters > 9 ? "9+" : numberOfFilters;

  return (
    <Pressable
      onPress={() => router.push("/workout/filters")}
      style={[
        styles.filterContainer,
        {
          backgroundColor: colors[colorScheme].icon,
        },
      ]}>
      <MaterialCommunityIcons
        name="filter"
        size={22}
        color={colors[colorScheme].fillTextColor}
      />

      {numberOfFilters > 0 && (
        <View style={styles.numContainer}>
          <Text style={styles.numText}>{count}</Text>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    borderRadius: 100,
    padding: 6,
  },

  numContainer: {
    backgroundColor: indigo[600],
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    width: 16,
    height: 16,
    position: "absolute",
    right: -4,
    top: -4,
  },

  numText: {
    color: "white",
    fontSize: 10,
    textAlign: "center",
  },
});

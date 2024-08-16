import { colors, indigo } from "@/constants/colors.constants";
import { ActiveFilters } from "@/store/exercise-filter-store";
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
  filters: ActiveFilters;
};

export const FilterIcon = ({ filters }: Props) => {
  const colorScheme = useColorScheme() ?? "light";

  const router = useRouter();

  const filterLength = filters?.length ?? 0;

  const numberOfFilters = filterLength > 9 ? "9+" : filterLength;

  return (
    <Pressable
      onPress={() => router.push("/workout/filters")}
      style={[
        styles.filterContainer,
        {
          backgroundColor: colors[colorScheme].icon,
        },
      ]}
    >
      <MaterialCommunityIcons
        name="filter"
        size={22}
        color={colors[colorScheme ?? "light"].background}
      />

      {filterLength > 0 && (
        <View style={styles.numContainer}>
          <Text style={styles.numText}>{numberOfFilters}</Text>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    backgroundColor: "red",
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

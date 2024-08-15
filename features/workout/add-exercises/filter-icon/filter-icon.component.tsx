import { colors, indigo } from "@/constants/colors.constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Text,
  useColorScheme,
  View,
  StyleSheet,
  Pressable,
} from "react-native";

type Props = {
  // TODO: Change the typing
  filters: any[];
};

export const FilterIcon = ({ filters }: Props) => {
  const colorScheme = useColorScheme();

  const numberOfFilters = filters.length > 9 ? "9+" : filters.length;

  return (
    <Pressable>
      <MaterialCommunityIcons
        name="filter"
        size={24}
        color={colors[colorScheme ?? "light"].text}
      />

      {filters.length > 0 && (
        <View style={styles.filterContainer}>
          <Text style={styles.filterText}>{numberOfFilters}</Text>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    backgroundColor: indigo[600],
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    width: 16,
    height: 16,
    position: "absolute",
    right: -6,
    top: -6,
  },

  filterText: {
    color: "white",
    fontSize: 10,
    textAlign: "center",
  },
});

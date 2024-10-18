import { ThemedTextInput } from "@/src/components/ui/form/themed-text-input/themed-text-input.component";
import { spacing } from "@/src/constants/spacing.constants";
import { useDebounce } from "@/src/hooks/use-debounce";
import { useGetCurrentLocation } from "@/src/services/location/get-current-location.service";
import { useState } from "react";
import { View, StyleSheet } from "react-native";

export const EditHomeGymContent = () => {
  const [homeGymSearchQuery, setHomeGymSearchQuery] = useState("");

  const debouncedHomeGymSearchQuery = useDebounce({
    value: homeGymSearchQuery,
  });

  const { data: currentLocation } = useGetCurrentLocation();

  return (
    <View style={styles.container}>
      <ThemedTextInput
        placeholder="Home gym"
        label="Home gym"
        value={homeGymSearchQuery}
        onChangeText={setHomeGymSearchQuery}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing[4],
  },
});

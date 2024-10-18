import { ThemedTextInput } from "@/src/components/ui/form/themed-text-input/themed-text-input.component";
import { spacing } from "@/src/constants/spacing.constants";
import { useDebounce } from "@/src/hooks/use-debounce";
import { useFindHomeGym } from "@/src/services/home-gym/find-home-gym.service";
import { useGetCurrentLocation } from "@/src/services/location/get-current-location.service";
import { useState } from "react";
import { View, StyleSheet } from "react-native";

export const SetHomeGymContent = () => {
  const [homeGymSearchQuery, setHomeGymSearchQuery] = useState("");

  const debouncedHomeGymSearchQuery = useDebounce({
    value: homeGymSearchQuery,
  });

  const { data: currentLocation } = useGetCurrentLocation();

  const { data: homeGyms } = useFindHomeGym({
    textQuery: debouncedHomeGymSearchQuery,
    latitude: currentLocation?.coords.latitude,
    longitude: currentLocation?.coords.longitude,
  });

  return (
    <View style={styles.container}>
      <ThemedTextInput
        label="Start typing your gym name"
        value={homeGymSearchQuery}
        onChangeText={setHomeGymSearchQuery}
        autoCapitalize="none"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing[4],
  },
});

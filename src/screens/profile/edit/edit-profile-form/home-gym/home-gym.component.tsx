import { ThemedTextInput } from "@/src/components/ui/form/themed-text-input/themed-text-input.component";
import { useDebounce } from "@/src/hooks/use-debounce";
import { useGetCurrentLocation } from "@/src/services/location/get-current-location.service";
import { useRequestLocationAccess } from "@/src/services/location/request-location-access.service";
import { useState } from "react";

export const HomeGym = () => {
  const [homeGymSearchQuery, setHomeGymSearchQuery] = useState("");

  const debouncedHomeGymSearchQuery = useDebounce({
    value: homeGymSearchQuery,
  });

  const { data: locationAccessStatus } = useRequestLocationAccess();

  console.log(locationAccessStatus);

  return (
    <ThemedTextInput
      placeholder="Home gym"
      label="Home gym"
      value={homeGymSearchQuery}
      onChangeText={setHomeGymSearchQuery}
    />
  );
};

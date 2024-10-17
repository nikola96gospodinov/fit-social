import { useQuery } from "@tanstack/react-query";
import * as Location from "expo-location";

const CURRENT_LOCATION_QUERY_KEY = "current-location";

const getCurrentLocation = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== "granted") {
    return;
  }

  const location = await Location.getCurrentPositionAsync();
  return location;
};

export const useGetCurrentLocation = () => {
  return useQuery({
    queryKey: [CURRENT_LOCATION_QUERY_KEY],
    queryFn: getCurrentLocation,
  });
};

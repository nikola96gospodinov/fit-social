import { useQuery } from "@tanstack/react-query";
import * as Location from "expo-location";
import { useRequestLocationAccess } from "./request-location-access.service";

const CURRENT_LOCATION_QUERY_KEY = "current-location";

const getCurrentLocation = async () => {
  const location = await Location.getCurrentPositionAsync();

  return location;
};

export const useGetCurrentLocation = () => {
  const { data: locationAccessStatus } = useRequestLocationAccess();

  return useQuery({
    queryKey: [CURRENT_LOCATION_QUERY_KEY],
    queryFn: getCurrentLocation,
    enabled: locationAccessStatus === "granted",
  });
};

import { useQuery } from "@tanstack/react-query";
import * as Location from "expo-location";

const REQUEST_LOCATION_ACCESS_QUERY_KEY = "request-location-access";

const requestLocationAccess = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();

  return status;
};

export const useRequestLocationAccess = () => {
  return useQuery({
    queryKey: [REQUEST_LOCATION_ACCESS_QUERY_KEY],
    queryFn: requestLocationAccess,
  });
};

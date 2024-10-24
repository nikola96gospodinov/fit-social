import { ThemedTextInput } from "@/src/components/ui/form/themed-text-input/themed-text-input.component";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { spacing } from "@/src/constants/spacing.constants";
import { useDebounce } from "@/src/hooks/use-debounce";
import {
  Gym,
  useFindHomeGym,
} from "@/src/services/home-gym/find-home-gym.service";
import { useGetCurrentLocation } from "@/src/services/location/get-current-location.service";
import { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ThemedActivityIndicator } from "@/src/components/ui/themed-activity-indicator/themed-activity-indicator.component";
import { NetworkError } from "@/src/components/error/network-error/network-error.component";
import { Flex } from "@/src/components/ui/layout/flex/flex.component";
import { HomeGymBox } from "./home-gym-box/home-gym-box.component";
import { ThemedButton } from "@/src/components/ui/themed-button/themed-button.component";
import { useUpdateProfile } from "@/src/services/profile/update-profile.service";
import { useGetSession } from "@/src/services/auth/get-session.service";

export const SetHomeGymContent = () => {
  const [homeGymSearchQuery, setHomeGymSearchQuery] = useState("");
  const [selectedHomeGym, setSelectedHomeGym] = useState<Gym>();

  const debouncedHomeGymSearchQuery = useDebounce({
    value: homeGymSearchQuery,
  });

  const { data: currentLocation } = useGetCurrentLocation();

  const {
    data: homeGyms,
    isError,
    isLoading,
    isFetched,
    refetch,
  } = useFindHomeGym({
    textQuery: debouncedHomeGymSearchQuery,
    latitude: currentLocation?.coords.latitude,
    longitude: currentLocation?.coords.longitude,
  });

  return (
    <View style={styles.container}>
      <ThemedTextInput
        label="Start typing your gym name"
        value={homeGymSearchQuery}
        onChangeText={(text) => {
          setHomeGymSearchQuery(text);
          setSelectedHomeGym(undefined);
        }}
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
      />

      <VerticalSpacing size={2} />

      <Flex align="flex-end">
        <ThemedText type="extraSmall" color="supporting">
          Powered by Google
        </ThemedText>
      </Flex>

      <VerticalSpacing size={6} />

      <FlatList
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <VerticalSpacing size={3} />}
        ListEmptyComponent={() => (
          <ListEmptyComponent
            isError={isError}
            isLoading={isLoading}
            isFetched={isFetched}
            refetch={refetch}
            homeGyms={homeGyms}
          />
        )}
        data={homeGyms}
        renderItem={({ item }) => (
          <HomeGymBox
            gym={item}
            isSelected={selectedHomeGym?.id === item.id}
            setSelectedHomeGym={setSelectedHomeGym}
          />
        )}
        ListFooterComponent={() => (
          <ListFooterComponent selectedHomeGym={selectedHomeGym} />
        )}
      />
    </View>
  );
};

type ListEmptyComponentProps = {
  isError: boolean;
  isLoading: boolean;
  isFetched: boolean;
  refetch: () => void;
  homeGyms?: Gym[];
};

const ListEmptyComponent = ({
  isError,
  isLoading,
  isFetched,
  refetch,
  homeGyms,
}: ListEmptyComponentProps) => {
  if (isLoading) {
    return <ThemedActivityIndicator />;
  }

  if (isError) {
    return <NetworkError message="Something went wrong..." refetch={refetch} />;
  }

  if (isFetched && homeGyms?.length === 0) {
    return <ThemedText>No gyms found matching your search</ThemedText>;
  }

  return null;
};

type ListFooterComponentProps = {
  selectedHomeGym: Gym | undefined;
};

const ListFooterComponent = ({ selectedHomeGym }: ListFooterComponentProps) => {
  const { mutate: updateProfile, isPending } = useUpdateProfile();
  const session = useGetSession();

  if (!selectedHomeGym) {
    return null;
  }

  return (
    <>
      <VerticalSpacing size={6} />

      <ThemedButton
        text="Set home gym"
        onPress={() => {
          updateProfile({
            data: {
              home_gym_id: selectedHomeGym.id,
              home_gym_name: selectedHomeGym.primaryName,
            },
            id: session.data!.user.id,
          });
        }}
        isLoading={isPending}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing[4],
  },
});

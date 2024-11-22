import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { useGetProfile } from "@/src/services/profile/get-profile.service";

export const HomeGymSuggestionsListHeader = () => {
  const { data: profile } = useGetProfile();

  const isHomeGym = profile?.home_gym_id;

  if (!isHomeGym) {
    // TODO: Prompt the user to set their home gym
  }

  return <ThemedText>People in your gym</ThemedText>;
};

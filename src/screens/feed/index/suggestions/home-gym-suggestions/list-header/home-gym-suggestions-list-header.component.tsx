import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { useGetProfile } from "@/src/services/profile/get-profile.service";
import { NoHomeGym } from "./no-home-gym/no-home-gym.component";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";

export const HomeGymSuggestionsListHeader = () => {
  const { data: profile } = useGetProfile();

  const isHomeGym = profile?.home_gym_id;

  return (
    <>
      <ThemedText type="small" color="supporting">
        People in your gym
      </ThemedText>

      {!isHomeGym && (
        <>
          <VerticalSpacing size={2} />

          <NoHomeGym />
        </>
      )}
    </>
  );
};

import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { useGetProfile } from "@/src/services/profile/get-profile.service";
import { NoHomeGym } from "./no-home-gym/no-home-gym.component";
import { ThemedActivityIndicator } from "@/src/components/ui/themed-activity-indicator/themed-activity-indicator.component";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { ThemedButton } from "@/src/components/ui/themed-button/themed-button.component";
import { Flex } from "@/src/components/ui/layout/flex/flex.component";
import { spacing } from "@/src/constants/spacing.constants";
import { StyleSheet } from "react-native";

type Props = {
  isLoading: boolean;
};

export const HomeGymSuggestionsListEmpty = ({ isLoading }: Props) => {
  const { data: profile, isLoading: profileLoading } = useGetProfile();

  const isHomeGym = profile?.home_gym_id;

  if (isLoading || profileLoading) {
    return (
      <>
        <VerticalSpacing size={4} />

        <ThemedActivityIndicator />
      </>
    );
  }

  if (!isHomeGym) {
    return <NoHomeGym />;
  }

  return (
    <Flex direction="column" align="center" style={styles.container}>
      <ThemedText>We couldn't find any suggestions</ThemedText>

      <VerticalSpacing size={2} />

      <ThemedButton text="Invite friends" size="sm" />
    </Flex>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing[4],
  },
});

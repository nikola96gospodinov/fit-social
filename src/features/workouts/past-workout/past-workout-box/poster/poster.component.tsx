import { Flex } from "@/src/components/ui/layout/flex/flex.component";
import { View } from "react-native";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { useGetProfile } from "@/src/services/profile/get-profile.service";
import { getWorkoutDistance } from "../past-workout-box.utils";
import { Tables } from "@/src/types/database.types";
import { Avatar } from "@/src/components/avatar/avatar.component";

type Props = {
  workout: Tables<"workouts">;
};

export const Poster = ({ workout }: Props) => {
  const { data: profile } = useGetProfile(workout.user_id);

  const distance = getWorkoutDistance(workout.started, workout.ended);

  return (
    <Flex direction="row" align="center" gap={3}>
      <View>
        <Avatar size={32} userId={profile?.id} />
      </View>

      <View>
        <ThemedText type="extraSmall">@{profile?.handle}</ThemedText>

        <VerticalSpacing size={0.5} />

        <ThemedText type="extraSmall" color="supporting">
          {distance}
        </ThemedText>
      </View>
    </Flex>
  );
};

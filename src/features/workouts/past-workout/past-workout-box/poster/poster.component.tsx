import { Flex } from "@/src/components/ui/layout/flex/flex.component";
import { colors } from "@/src/constants/colors.constants";
import { useColorScheme, StyleSheet } from "react-native";
import { View } from "react-native";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { spacing } from "@/src/constants/spacing.constants";
import { useGetProfile } from "@/src/services/profile/get-profile.service";
import { getWorkoutDistance } from "../past-workout-box.utils";
import { Tables } from "@/src/types/database.types";
import { Avatar } from "@/src/components/avatar/avater.component";

type Props = {
  workout: Tables<"workouts">;
};

export const Poster = ({ workout }: Props) => {
  const theme = useColorScheme() ?? "light";

  const { data: profile } = useGetProfile(workout.user_id);

  const distance = getWorkoutDistance(workout.started, workout.ended);

  return (
    <Flex
      direction="row"
      align="center"
      gap={3}
      style={[
        styles.userInfoContainer,
        {
          backgroundColor: colors[theme].background,
          borderColor: colors[theme].sectionBackground,
        },
      ]}>
      <View>
        <Avatar
          size={32}
          userId={profile?.id}
          avatarUrl={profile?.avatar_url}
        />
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

const styles = StyleSheet.create({
  userInfoContainer: {
    padding: spacing[3],
    borderTopLeftRadius: 16,
    borderBottomRightRadius: 16,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    alignSelf: "flex-start",
    transform: [{ translateX: -spacing[3] }, { translateY: -spacing[3] }],
  },
});
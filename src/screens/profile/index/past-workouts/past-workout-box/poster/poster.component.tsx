import { Flex } from "@/src/components/ui/layout/flex/flex.component";
import { colors } from "@/src/constants/colors.constants";
import { useColorScheme, StyleSheet } from "react-native";
import { View } from "react-native";
import { Image } from "expo-image";
import { FontAwesome } from "@expo/vector-icons";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { spacing } from "@/src/constants/spacing.constants";
import { useGetProfile } from "@/src/services/profile/get-profile.service";
import { useGetProfilePic } from "@/src/services/profile/get-profile-pic.service";
import { getWorkoutDistance } from "../past-workout-box.utils";
import { Tables } from "@/src/types/database.types";

type Props = {
  workout: Tables<"workouts">;
};

export const Poster = ({ workout }: Props) => {
  const theme = useColorScheme() ?? "light";

  const { data: profile } = useGetProfile();
  const { data: profilePic } = useGetProfilePic();

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
          borderColor: colors[theme].cardBackground,
        },
      ]}>
      <View>
        {profilePic ? (
          <Image
            source={{
              uri: profilePic,
            }}
            style={styles.image}
          />
        ) : (
          <FontAwesome
            name="user-circle"
            size={32}
            color={colors[theme].icon}
          />
        )}
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

  image: {
    width: 32,
    height: 32,
    borderRadius: 50,
  },
});

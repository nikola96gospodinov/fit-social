import { View, StyleSheet, useColorScheme } from "react-native";
import { spacing } from "@/src/constants/spacing.constants";
import { Flex } from "@/src/components/ui/layout/flex/flex.component";
import { Avatar } from "./avatar/avatar.component";
import { useGetProfile } from "@/src/services/profile/get-profile.service";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { colors } from "@/src/constants/colors.constants";
import { FontAwesome6 } from "@expo/vector-icons";
import { ProfileGradient } from "./profile-gradient/profile-gradient.component";

export const ProfileHeader = () => {
  const theme = useColorScheme() ?? "light";

  const { data: profile } = useGetProfile();

  if (!profile) {
    return null;
  }

  return (
    <View>
      <ProfileGradient />

      <View style={styles.container}>
        <Flex direction="row" justify="space-between">
          <Flex direction="row" gap={2}>
            <Avatar avatarUrl={profile.avatar_url} />

            <View style={styles.userInfo}>
              <ThemedText type="subtitle">
                {/* TODO: Change */}
                {profile.full_name ?? "Nik Gospodinov"}
              </ThemedText>

              {/* TODO: Change */}
              <ThemedText type="small">
                @{profile.username ?? "nikgospodinov"}
              </ThemedText>
            </View>
          </Flex>

          <FontAwesome6
            name="user-gear"
            size={20}
            color={colors[theme].icon}
            style={{ marginTop: -spacing[2], marginRight: -spacing[1] }}
          />
        </Flex>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing[4],
  },

  userInfo: {
    marginTop: spacing[2],
  },
});

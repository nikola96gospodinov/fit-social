import { ThemedButton } from "@/src/components/ui/themed-button/themed-button.component";
import { View } from "react-native";

export const FollowButton = () => {
  // TODO: Determine later
  const isFollowing = false;

  return (
    <View>
      <ThemedButton
        text={isFollowing ? "Following" : "Follow"}
        size="xs"
        style={{ borderRadius: 100 }}
        variant={isFollowing ? "outline" : "primary"}
      />
    </View>
  );
};

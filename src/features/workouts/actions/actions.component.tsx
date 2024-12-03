import { Flex } from "@/src/components/ui/layout/flex/flex.component";
import { colors } from "@/src/constants/colors.constants";
import { useColorScheme, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { LikeAction } from "./like-action/like-action.component";

type Props = {
  workoutId: string;
};

export const Actions = ({ workoutId }: Props) => {
  const theme = useColorScheme() ?? "light";

  return (
    <Flex direction="row" gap={4} align="center">
      <LikeAction workoutId={workoutId} />

      <FontAwesome
        name="comment-o"
        size={22}
        color={colors[theme].icon}
        style={styles.icon}
      />
    </Flex>
  );
};

const styles = StyleSheet.create({
  icon: {
    transform: [{ translateY: -1 }],
  },
});

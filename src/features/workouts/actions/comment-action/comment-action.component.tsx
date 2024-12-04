import { colors } from "@/src/constants/colors.constants";
import { FontAwesome } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";
import { Pressable, useColorScheme, StyleSheet } from "react-native";

type Props = {
  workoutId: string;
};

export const CommentAction = ({ workoutId }: Props) => {
  const theme = useColorScheme() ?? "light";

  const pathname = usePathname();
  const tab = pathname.includes("profile") ? "profile" : "(index)";

  return (
    <Pressable onPress={() => router.push(`/${tab}/add-comment/${workoutId}`)}>
      <FontAwesome
        name="comment-o"
        size={22}
        color={colors[theme].icon}
        style={styles.icon}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  icon: {
    transform: [{ translateY: -1 }],
  },
});

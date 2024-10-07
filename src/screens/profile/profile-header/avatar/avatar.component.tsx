import { useColorScheme, View, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { colors } from "@/src/constants/colors.constants";
import { spacing } from "@/src/constants/spacing.constants";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

type Props = {
  avatarUrl: string | null;
};

export const Avatar = ({ avatarUrl }: Props) => {
  const theme = useColorScheme() ?? "light";

  return (
    <View
      style={[
        styles.avatar,
        {
          borderColor: colors[theme].background,
          backgroundColor: colors[theme].background,
        },
      ]}>
      {avatarUrl ? (
        <Image source={{ uri: avatarUrl }} />
      ) : (
        <FontAwesome name="user-circle" size={90} color={colors[theme].icon} />
      )}

      <View
        style={[
          styles.avatarEdit,
          {
            backgroundColor: colors[theme].background,
            borderColor: colors[theme].border,
          },
        ]}>
        <FontAwesome6 name="pencil" size={14} color={colors[theme].icon} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 5,
    marginTop: -spacing[8],
    alignItems: "center",
    justifyContent: "center",
  },

  avatarEdit: {
    position: "absolute",
    bottom: 0,
    right: 0,
    padding: spacing[1],
    borderRadius: 100,
    borderWidth: 1,
  },
});

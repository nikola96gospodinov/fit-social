import { useColorScheme, View, StyleSheet, Pressable } from "react-native";
import { Image } from "expo-image";
import { colors } from "@/src/constants/colors.constants";
import { spacing } from "@/src/constants/spacing.constants";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { usePickImage } from "@/src/services/camera/pick-image.service";

type Props = {
  avatarUrl: string | null;
};

export const Avatar = ({ avatarUrl }: Props) => {
  const theme = useColorScheme() ?? "light";

  // TODO: Determine later
  const isYourProfile = true;

  const { mutate: pickImage, data: imageUrl } = usePickImage();

  const image = avatarUrl ?? imageUrl;

  return (
    <View
      style={[
        styles.avatar,
        {
          borderColor: colors[theme].background,
          backgroundColor: colors[theme].background,
        },
      ]}>
      {image ? (
        <Image
          source={{
            uri: image,
          }}
          style={styles.image}
        />
      ) : (
        <FontAwesome name="user-circle" size={60} color={colors[theme].icon} />
      )}

      {isYourProfile && (
        <Pressable
          style={[
            styles.avatarEdit,
            {
              backgroundColor: colors[theme].background,
              borderColor: colors[theme].border,
            },
          ]}
          onPress={() => pickImage()}>
          <FontAwesome6 name="pencil" size={12} color={colors[theme].icon} />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 68,
    height: 68,
    borderRadius: 50,
    borderWidth: 4,
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

  image: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
});

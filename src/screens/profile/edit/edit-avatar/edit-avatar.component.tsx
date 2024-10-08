import { Flex } from "@/src/components/ui/layout/flex/flex.component";
import { colors } from "@/src/constants/colors.constants";
import { usePickImage } from "@/src/services/camera/pick-image.service";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { Pressable, useColorScheme, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { spacing } from "@/src/constants/spacing.constants";
import { useGetProfile } from "@/src/services/profile/get-profile.service";
import { ThemedActivityIndicator } from "@/src/components/ui/themed-activity-indicator/themed-activity-indicator.component";

export const EditAvatar = () => {
  const theme = useColorScheme() ?? "light";

  const { mutate: pickImage, data: imageUrl, isPending } = usePickImage();

  const { data: profile } = useGetProfile();

  if (!profile) return null;

  const image = profile.avatar_url ?? imageUrl;

  return (
    <Flex align="center">
      <Pressable onPress={() => pickImage()}>
        {image ? (
          <Image
            source={{
              uri: image,
            }}
            style={styles.image}
          />
        ) : (
          <FontAwesome
            name="user-circle"
            size={125}
            color={colors[theme].icon}
          />
        )}
      </Pressable>

      <Pressable
        style={[
          styles.avatarEdit,
          {
            backgroundColor: colors[theme].background,
            borderColor: colors[theme].border,
          },
        ]}
        onPress={() => pickImage()}>
        {isPending ? (
          <ThemedActivityIndicator size={18} />
        ) : (
          <FontAwesome6 name="pencil" size={18} color={colors[theme].icon} />
        )}
      </Pressable>
    </Flex>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 125,
    height: 125,
    borderRadius: 100,
  },

  avatarEdit: {
    position: "absolute",
    bottom: -5,
    right: "50%",
    transform: [{ translateX: 65 }],
    padding: spacing[2],
    borderRadius: 100,
    borderWidth: 2,
  },
});

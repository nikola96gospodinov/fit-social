import { Flex } from "@/src/components/ui/layout/flex/flex.component";
import { colors } from "@/src/constants/colors.constants";
import { usePickImage } from "@/src/services/camera/pick-image.service";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { Pressable, useColorScheme, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { spacing } from "@/src/constants/spacing.constants";
import { useGetProfile } from "@/src/services/profile/get-profile.service";
import { ThemedActivityIndicator } from "@/src/components/ui/themed-activity-indicator/themed-activity-indicator.component";
import { useUpdateProfilePic } from "@/src/services/profile/update-profile-pic.service";

export const EditAvatar = () => {
  const theme = useColorScheme() ?? "light";

  // TODO: Add error handling & policy only for the right user to upload image
  const {
    mutate: pickImage,
    data: image,
    isPending: isPickingImage,
  } = usePickImage();

  const { mutate: updateProfilePic, isPending: isUpdatingProfilePic } =
    useUpdateProfilePic();

  const { data: profile } = useGetProfile();

  const onPress = () => {
    if (image && profile?.handle) {
      updateProfilePic({ imageUri: image, handle: profile.handle });
    } else {
      pickImage();
    }
  };

  if (!profile) return null;

  const imageURL = image ?? profile.avatar_url;
  const isPending = isPickingImage || isUpdatingProfilePic;

  return (
    <Flex align="center">
      <Pressable onPress={onPress}>
        {imageURL ? (
          <Image
            source={{
              uri: imageURL,
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
        onPress={onPress}>
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

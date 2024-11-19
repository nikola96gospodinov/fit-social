import { Flex } from "@/src/components/ui/layout/flex/flex.component";
import { colors } from "@/src/constants/colors.constants";
import { usePickImage } from "@/src/services/camera/pick-image.service";
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, useColorScheme, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { spacing } from "@/src/constants/spacing.constants";
import { useGetProfile } from "@/src/services/profile/get-profile.service";
import { useUpdateProfilePic } from "@/src/services/profile/update-profile-pic.service";
import { useGetProfilePic } from "@/src/services/profile/get-profile-pic.service";
import { ThemedButton } from "@/src/components/ui/themed-button/themed-button.component";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";

export const EditAvatar = () => {
  const theme = useColorScheme() ?? "light";

  const {
    mutate: pickImage,
    data: image,
    isPending: isPickingImage,
    isError: isPickingImageError,
    reset: resetPickingImage,
  } = usePickImage();

  const { mutate: updateProfilePic, isPending: isUpdatingProfilePic } =
    useUpdateProfilePic();

  const { data: profile } = useGetProfile();
  const { data: profilePic } = useGetProfilePic();

  const onPress = () => {
    if (isPickingImageError) {
      resetPickingImage();
    } else if (image && profile?.id) {
      updateProfilePic({ imageUri: image, userID: profile.id });
    } else {
      pickImage();
    }
  };

  const buttonText = (() => {
    if (isPickingImage) return "Loading gallery...";
    if (isUpdatingProfilePic) return "Updating profile picture...";
    if (isPickingImageError) return "Try again";
    if (image) return "Save Image";
    if (profilePic) return "Update Profile Picture";
    return "Add Profile Picture";
  })();

  if (!profile) return null;

  const imageURL = image ?? profilePic;

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
          <Flex
            style={[
              styles.iconContainer,
              {
                borderColor: colors[theme].border,
              },
            ]}
            justify="center"
            align="center">
            <MaterialIcons
              name="add-a-photo"
              size={75}
              color={colors[theme].icon}
            />
          </Flex>
        )}
      </Pressable>

      <VerticalSpacing size={2} />

      <View>
        <ThemedButton
          text={buttonText}
          variant="flat"
          onPress={onPress}
          icon={image && !isUpdatingProfilePic ? "save" : undefined}
        />
      </View>
    </Flex>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 125,
    height: 125,
    borderRadius: 100,
  },

  iconContainer: {
    width: 125,
    height: 125,
    borderRadius: 100,
    borderWidth: 3,
  },

  avatarEdit: {
    position: "absolute",
    bottom: -5,
    right: "50%",
    transform: [{ translateX: 65 }],
    padding: spacing[2] + spacing[0.5],
    borderRadius: 100,
    borderWidth: 2,
  },
});

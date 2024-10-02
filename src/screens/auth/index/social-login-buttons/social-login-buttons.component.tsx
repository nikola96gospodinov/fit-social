import { SlideContent } from "@/src/components/animation/slide-content.component";
import { NetworkError } from "@/src/components/error/network-error/network-error.component";
import { Flex } from "@/src/components/ui/layout/flex/flex.component";
import { ThemedActivityIndicator } from "@/src/components/ui/themed-activity-indicator/themed-activity-indicator.component";
import { slate } from "@/src/constants/colors.constants";
import { spacing } from "@/src/constants/spacing.constants";
import { useGoogleLogin } from "@/src/services/auth/google-login.service";
import { Image } from "expo-image";
import { Platform, Pressable, StyleSheet } from "react-native";

export const SocialLoginButtons = () => {
  const { mutate: googleSignIn, isPending, error } = useGoogleLogin();

  return (
    <Flex gap={4} direction="row" align="center" justify="center">
      {Platform.OS === "android" && (
        <Pressable style={styles.imageContainer} onPress={() => googleSignIn()}>
          {isPending ? (
            <ThemedActivityIndicator size={24} />
          ) : (
            <Image
              source={require("@/assets/images/google.webp")}
              style={styles.image}
              contentFit="contain"
            />
          )}
        </Pressable>
      )}

      <Pressable style={styles.imageContainer}>
        <Image
          source={require("@/assets/images/apple.png")}
          style={styles.image}
          contentFit="contain"
        />
      </Pressable>

      <Pressable style={styles.imageContainer}>
        <Image
          source={require("@/assets/images/facebook.webp")}
          style={styles.image}
          contentFit="contain"
        />
      </Pressable>

      <SlideContent isVisible={!!error}>
        <NetworkError message={error?.message} />
      </SlideContent>
    </Flex>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: slate[50],
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: slate[500],
    padding: spacing[2],
    borderRadius: 100,
  },

  image: {
    width: 24,
    height: 24,
  },
});

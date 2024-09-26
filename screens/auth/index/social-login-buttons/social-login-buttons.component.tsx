import { Flex } from "@/components/ui/layout/flex/flex.component";
import { slate } from "@/constants/colors.constants";
import { spacing } from "@/constants/spacing.constants";
import { Image } from "expo-image";
import { Pressable, StyleSheet } from "react-native";

export const SocialLoginButtons = () => {
  return (
    <Flex gap={4} direction="row" align="center" justify="center">
      <Pressable style={styles.imageContainer}>
        <Image
          source={require("@/assets/images/google.webp")}
          style={styles.image}
          contentFit="contain"
        />
      </Pressable>

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

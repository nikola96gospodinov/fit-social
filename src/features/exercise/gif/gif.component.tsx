import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { colors } from "@/src/constants/colors.constants";
import { spacing } from "@/src/constants/spacing.constants";
import { Exercise } from "@/src/types/api/exercise.types";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  useColorScheme,
} from "react-native";

type Props = {
  exercise: Exercise;
};

export const Gif = ({ exercise }: Props) => {
  const theme = useColorScheme() ?? "light";

  const windowWidth = Dimensions.get("window").width;

  return (
    <View
      style={[
        styles.imageContainer,
        {
          borderColor: colors[theme].border,
        },
      ]}>
      <Image
        source={{ uri: exercise.image_url ?? "" }}
        style={[
          styles.image,
          {
            height: windowWidth - spacing[4] * 2,
          },
        ]}
      />

      <View
        style={[
          styles.equipmentContainer,
          {
            backgroundColor: colors[theme].border,
          },
        ]}>
        <ThemedText type="small">{exercise.equipment_name}</ThemedText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
  },

  imageContainer: {
    borderWidth: 1,
    borderRadius: 8,
    overflow: "hidden",
  },

  equipmentContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    paddingVertical: spacing[1],
    paddingHorizontal: spacing[3],
    borderTopLeftRadius: 8,
  },
});

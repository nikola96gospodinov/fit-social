import { Flex } from "@/src/components/ui/layout/flex/flex.component";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { colors } from "@/src/constants/colors.constants";
import { spacing } from "@/src/constants/spacing.constants";
import { useActiveWorkoutStore } from "@/src/store/active-workout-store";
import { MaterialIcons } from "@expo/vector-icons";
import { LayoutAnimation, Pressable, useColorScheme } from "react-native";

type Props = {
  exerciseId: string;
  setId: string;
};

export const SetUnderlayLeft = ({ exerciseId, setId }: Props) => {
  const {
    store: { removeSet },
  } = useActiveWorkoutStore();

  const theme = useColorScheme() ?? "light";

  return (
    <Flex
      align="center"
      justify="center"
      style={{
        backgroundColor: colors[theme].destructiveBackground,
        padding: spacing[2],
        alignSelf: "flex-end",
        height: "100%",
        width: 120,
      }}>
      <Pressable
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          removeSet({ setId });
        }}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: spacing[1],
        }}>
        <MaterialIcons
          name="delete"
          size={16}
          color={colors[theme].destructiveIcon}
        />
        <ThemedText color="error" type="small">
          Delete
        </ThemedText>
      </Pressable>
    </Flex>
  );
};

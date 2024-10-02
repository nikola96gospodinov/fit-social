import { Flex } from "@/src/components/ui/layout/flex/flex.component";
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
  const { removeSet } = useActiveWorkoutStore();

  const theme = useColorScheme() ?? "light";

  return (
    <Flex
      align="flex-end"
      justify="center"
      style={{
        backgroundColor: colors[theme].destructiveBackground,
        padding: spacing[2],
        width: 40,
        alignSelf: "flex-end",
      }}>
      <Pressable
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          removeSet({ exerciseId, setId });
        }}>
        <MaterialIcons
          name="delete"
          size={24}
          color={colors[theme].destructiveIcon}
        />
      </Pressable>
    </Flex>
  );
};

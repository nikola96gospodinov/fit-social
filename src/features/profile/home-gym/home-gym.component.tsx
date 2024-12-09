import { Flex } from "@/src/components/ui/layout/flex/flex.component";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { colors } from "@/src/constants/colors.constants";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, useColorScheme } from "react-native";

type Props = {
  homeGymName: string;
};

export const HomeGym = ({ homeGymName }: Props) => {
  const theme = useColorScheme() ?? "light";

  return (
    <>
      <VerticalSpacing size={2} />

      <Flex
        direction="row"
        gap={1}
        align="center"
        style={styles.homeGymContainer}>
        <Ionicons
          name="location-sharp"
          size={14}
          color={colors[theme].activeIcon}
        />

        <ThemedText type="extraSmall" color="supporting">
          {homeGymName}
        </ThemedText>
      </Flex>
    </>
  );
};

const styles = StyleSheet.create({
  homeGymContainer: {
    transform: [{ translateX: -4 }],
  },
});

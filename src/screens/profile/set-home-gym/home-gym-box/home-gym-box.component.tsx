import { ThemedRadio } from "@/src/components/ui/form/themed-radio/themed-radio.component";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { colors } from "@/src/constants/colors.constants";
import { spacing } from "@/src/constants/spacing.constants";
import { Gym } from "@/src/services/home-gym/find-home-gym.service";
import { StyleSheet, useColorScheme, Pressable, View } from "react-native";

type Props = {
  gym: Gym;
  isSelected: boolean;
  setSelectedHomeGym: React.Dispatch<React.SetStateAction<Gym | undefined>>;
};

export const HomeGymBox = ({ gym, isSelected, setSelectedHomeGym }: Props) => {
  const theme = useColorScheme() ?? "light";

  const handlePress = () => {
    setSelectedHomeGym(isSelected ? undefined : gym);
  };

  return (
    <Pressable
      onPress={handlePress}
      style={[
        styles.container,
        {
          backgroundColor: isSelected
            ? colors[theme].tintActiveBackground
            : colors[theme].background,
          borderColor: isSelected
            ? colors[theme].borderFocused
            : colors[theme].border,
        },
      ]}>
      <ThemedRadio isSelected={isSelected} onPress={handlePress} />

      <View>
        <ThemedText>{gym.primaryName}</ThemedText>
        <ThemedText type="extraSmall" color="supporting">
          {gym.secondaryName}
        </ThemedText>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing[3],
    alignItems: "center",
  },
});

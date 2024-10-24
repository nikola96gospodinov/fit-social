import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { colors } from "@/src/constants/colors.constants";
import { Gym } from "@/src/services/home-gym/find-home-gym.service";
import { StyleSheet, useColorScheme, Pressable } from "react-native";

type Props = {
  gym: Gym;
  isSelected: boolean;
  setSelectedHomeGym: React.Dispatch<React.SetStateAction<Gym | undefined>>;
};

export const HomeGymBox = ({ gym, isSelected, setSelectedHomeGym }: Props) => {
  const theme = useColorScheme() ?? "light";

  return (
    <Pressable
      onPress={() => setSelectedHomeGym(isSelected ? undefined : gym)}
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
      <ThemedText>{gym.primaryName}</ThemedText>
      <ThemedText type="extraSmall" color="supporting">
        {gym.secondaryName}
      </ThemedText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
});

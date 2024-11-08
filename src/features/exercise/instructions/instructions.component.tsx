import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { ULItem } from "@/src/components/ui/ul-item/ul-item.component";
import { colors } from "@/src/constants/colors.constants";
import { Exercise } from "@/src/types/api/exercise.types";
import { View, FlatList, useColorScheme, StyleSheet } from "react-native";

type Props = {
  exercise: Exercise;
};

export const Instructions = ({ exercise }: Props) => {
  const theme = useColorScheme() ?? "light";

  return (
    <View
      style={[
        styles.instructionsContainer,
        {
          borderColor: colors[theme].border,
          backgroundColor: colors[theme].sectionBackground,
        },
      ]}>
      <ThemedText style={{ fontWeight: "bold" }}>Instructions:</ThemedText>

      <VerticalSpacing size={2} />

      <FlatList
        ItemSeparatorComponent={() => <VerticalSpacing size={0.5} />}
        nestedScrollEnabled={true}
        scrollEnabled={false}
        data={exercise.instructions}
        renderItem={({ item }) => <ULItem text={item} />}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  instructionsContainer: {
    borderWidth: 1,
    padding: 16,
    borderRadius: 8,
  },

  flatListContainer: {
    paddingHorizontal: 12,
    paddingBottom: 4,
  },
});

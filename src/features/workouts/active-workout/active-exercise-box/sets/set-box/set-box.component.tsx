import { Flex } from "@/src/components/ui/layout/flex/flex.component";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { colors } from "@/src/constants/colors.constants";
import { spacing } from "@/src/constants/spacing.constants";
import {
  ActiveExercise,
  ActiveSet,
  useActiveWorkoutStore,
} from "@/src/store/active-workout-store";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React, { useEffect, useRef } from "react";
import {
  Pressable,
  useColorScheme,
  StyleSheet,
  View,
  Animated,
} from "react-native";
import SwipeableItem, {
  SwipeableItemImperativeRef,
} from "react-native-swipeable-item";
import { SetUnderlayLeft } from "./set-underlay-left/set-underlay-left.component";
import { useAnimateColor } from "@/src/hooks/use-animate-color";
import { Database } from "@/src/types/database.types";
import { AllInputs } from "./set-inputs/all-inputs/all-inputs.component";

type Props = {
  set: ActiveSet;
  index: number;
  exercise: ActiveExercise;
  drag: () => void;
  isActive: boolean;
  isBoxActive: boolean;
  previousSet?: Database["public"]["Functions"]["get_previous_sets_for_exercise"]["Returns"][number];
};

export const SetBox = ({
  set,
  index,
  exercise,
  drag,
  isActive,
  isBoxActive,
  previousSet,
}: Props) => {
  const {
    store: { updateSet },
  } = useActiveWorkoutStore();

  const itemRef = useRef<SwipeableItemImperativeRef>(null);

  const theme = useColorScheme() ?? "light";

  const { animate, color } = useAnimateColor({
    duration: 150,
    colors: [
      colors[theme].cardBackground, // Default
      colors[theme].tintActiveBackground, // isActive || isBoxActive
      colors[theme].successBackground, // set.is_done
    ],
    inputRange: [0, 1, 2],
  });

  useEffect(() => {
    const targetValue = (() => {
      if (isBoxActive || isActive) return 1;
      if (set.is_done) return 2;
      return 0;
    })();

    animate(targetValue);
  }, [animate, isBoxActive, isActive, set.is_done]);

  const previousSetText = previousSet
    ? `${previousSet.weight} x ${previousSet.reps}`
    : "-";

  return (
    <SwipeableItem
      item={set}
      renderUnderlayLeft={() => (
        <SetUnderlayLeft exerciseId={exercise.exercise_id} setId={set.id} />
      )}
      snapPointsLeft={[40]}
      overSwipe={100}
      ref={itemRef}>
      <Pressable onLongPress={drag} disabled={isActive}>
        <Animated.View
          style={[
            styles.container,
            {
              backgroundColor: color,
              borderColor: isActive
                ? colors[theme].borderFocused
                : "transparent",
            },
          ]}>
          <View style={{ width: 32 }}>
            <ThemedText color="tintText">{index + 1}.</ThemedText>
          </View>

          <View style={{ width: 64 }}>
            <ThemedText type="extraSmall" color="supporting">
              {previousSetText}
            </ThemedText>
          </View>

          <Flex direction="row" align="center" gap={2} style={{ flex: 1 }}>
            <AllInputs set={set} exercise={exercise} />
          </Flex>

          <Pressable
            onPress={() =>
              updateSet({
                exerciseId: exercise.exercise_id,
                setId: set.id,
                isDone: !set.is_done,
              })
            }>
            {/* For some reason dynamically changing the name and color of one icon is causing huge performance issues */}
            {set.is_done ? (
              <FontAwesome
                name="check-square"
                size={24}
                color={colors[theme].success}
              />
            ) : (
              <FontAwesome
                name="square-o"
                size={24}
                color={colors[theme].icon}
              />
            )}
          </Pressable>
        </Animated.View>
      </Pressable>
    </SwipeableItem>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: spacing[3],
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
});

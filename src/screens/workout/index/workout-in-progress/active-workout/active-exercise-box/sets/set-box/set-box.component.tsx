import { Flex } from "@/src/components/ui/layout/flex/flex.component";
import { ThemedTextInput } from "@/src/components/ui/form/themed-text-input/themed-text-input.component";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { colors } from "@/src/constants/colors.constants";
import { spacing } from "@/src/constants/spacing.constants";
import { useActiveWorkoutStore } from "@/src/store/active-workout-store";
import { ExerciseSet } from "@/src/types/workout.types";
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

type Props = {
  set: ExerciseSet;
  index: number;
  exerciseId: string;
  drag: () => void;
  isActive: boolean;
  isBoxActive: boolean;
};

export const SetBox = ({
  set,
  index,
  exerciseId,
  drag,
  isActive,
  isBoxActive,
}: Props) => {
  const { updateSet } = useActiveWorkoutStore();

  const itemRef = useRef<SwipeableItemImperativeRef>(null);

  const theme = useColorScheme() ?? "light";

  const { animate, color } = useAnimateColor({
    duration: 150,
    colors: [
      colors[theme].cardBackground, // Default
      colors[theme].tintActiveBackground, // isActive || isBoxActive
      colors[theme].successBackground, // set.isDone
    ],
    inputRange: [0, 1, 2],
  });

  useEffect(() => {
    const targetValue = (() => {
      if (isBoxActive || isActive) return 1;
      if (set.isDone) return 2;
      return 0;
    })();

    animate(targetValue);
  }, [animate, isBoxActive, isActive, set.isDone]);

  return (
    <SwipeableItem
      item={set}
      renderUnderlayLeft={() => (
        <SetUnderlayLeft exerciseId={exerciseId} setId={set.id} />
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

          <Flex direction="row" align="center" gap={2} style={{ flex: 1 }}>
            <ThemedTextInput
              value={set.weight ? set.weight.toString() : ""}
              keyboardType="numeric"
              width={60}
              onChangeText={(text) =>
                updateSet({ exerciseId, setId: set.id, weight: Number(text) })
              }
              centerContent
              size="small"
            />

            <ThemedText>x</ThemedText>

            <ThemedTextInput
              value={set.reps ? set.reps.toString() : ""}
              keyboardType="numeric"
              width={60}
              onChangeText={(text) =>
                updateSet({ exerciseId, setId: set.id, reps: Number(text) })
              }
              centerContent
              size="small"
            />
          </Flex>

          <Pressable
            onPress={() =>
              updateSet({ exerciseId, setId: set.id, isDone: !set.isDone })
            }>
            {/* For some reason dynamically changing the name and color of one icon is causing huge performance issues */}
            {set.isDone ? (
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

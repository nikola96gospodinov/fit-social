import { ThemedText } from "../themed-text/themed-text.component";
import { Flex } from "../layout/flex/flex.component";
import {
  StyleSheet,
  useColorScheme,
  Pressable,
  View,
  LayoutAnimation,
} from "react-native";
import { colors } from "@/constants/colors.constants";
import { spacing } from "@/constants/spacing.constants";
import { useEffect } from "react";

type Props<Left extends string, Right extends string> = {
  leftText: Left;
  rightText: Right;
  activeAction: Left | Right;
  setActiveAction: React.Dispatch<React.SetStateAction<Left | Right>>;
};

export const ActionToggler = <Left extends string, Right extends string>({
  leftText,
  rightText,
  activeAction,
  setActiveAction,
}: Props<Left, Right>) => {
  const theme = useColorScheme() ?? "light";

  return (
    <Flex
      direction="row"
      align="center"
      justify="center"
      style={[
        styles.container,
        {
          backgroundColor: colors[theme].cardBackground,
          borderColor: colors[theme].border,
        },
      ]}>
      <View
        style={[
          styles.bubble,
          {
            backgroundColor: colors[theme].oppositeBackground,
            left: activeAction === leftText ? 3 : "50%",
            right: activeAction === rightText ? 3 : "50%",
          },
        ]}
      />

      <Pressable
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
          setActiveAction(leftText);
        }}
        style={[styles.action, styles.leftAction]}>
        <ThemedText color={activeAction === leftText ? "inverted" : "default"}>
          {leftText}
        </ThemedText>
      </Pressable>

      <Pressable
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
          setActiveAction(rightText);
        }}
        style={[styles.action, styles.rightAction]}>
        <ThemedText color={activeAction === rightText ? "inverted" : "default"}>
          {rightText}
        </ThemedText>
      </Pressable>
    </Flex>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 24,
    paddingVertical: spacing[1],
    paddingHorizontal: 0.5,
    borderWidth: 1,
  },

  action: {
    flex: 1,
    borderRadius: 24,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  leftAction: {
    marginLeft: spacing[1],
  },

  rightAction: {
    marginRight: spacing[1],
  },

  inactiveAction: {
    backgroundColor: "transparent",
  },

  bubble: {
    width: "50%",
    backgroundColor: "red",
    height: "100%",
    borderRadius: 24,
    position: "absolute",
  },
});

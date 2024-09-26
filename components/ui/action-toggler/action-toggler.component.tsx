import { ThemedText } from "../themed-text/themed-text.component";
import { Flex } from "../layout/flex/flex.component";
import { StyleSheet, useColorScheme, Pressable } from "react-native";
import { colors } from "@/constants/colors.constants";
import { spacing } from "@/constants/spacing.constants";
import { useState } from "react";

type Props = {
  leftText: string;
  rightText: string;
};

export const ActionToggler = ({ leftText, rightText }: Props) => {
  const theme = useColorScheme() ?? "light";

  const [activeAction, setActiveAction] = useState<"left" | "right">("left");

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
      <Pressable
        onPress={() => setActiveAction("left")}
        style={[
          styles.action,
          styles.leftAction,
          activeAction === "left" && {
            backgroundColor: colors[theme].oppositeBackground,
          },
        ]}>
        <ThemedText color={activeAction === "left" ? "inverted" : "default"}>
          {leftText}
        </ThemedText>
      </Pressable>

      <Pressable
        onPress={() => setActiveAction("right")}
        style={[
          styles.action,
          styles.rightAction,
          activeAction === "right" && {
            backgroundColor: colors[theme].oppositeBackground,
          },
        ]}>
        <ThemedText color={activeAction === "right" ? "inverted" : "default"}>
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
});

import {
  Pressable,
  type PressableProps,
  Text,
  useColorScheme,
  StyleSheet,
} from "react-native";
import { getButtonStyles } from "./themed-button.utils";
import { Size, Variant } from "./themed-button.types";
import { ThemedActivityIndicator } from "../themed-activity-indicator/themed-activity-indicator.component";
import { IconProps } from "@expo/vector-icons/build/createIconSet";
import { ComponentProps } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Flex } from "../layout/flex/flex.component";

type Props = PressableProps & {
  text: string;
  variant?: Variant;
  size?: Size;
  isCentered?: boolean;
  isFullWidth?: boolean;
  isLoading?: boolean;
  icon?: IconProps<ComponentProps<typeof FontAwesome>["name"]>["name"];
  iconPosition?: "left" | "right";
};

export const ThemedButton = ({
  style,
  text,
  disabled,
  variant = "primary",
  size = "md",
  isCentered = false,
  isFullWidth = false,
  isLoading = false,
  icon,
  iconPosition = "left",
  ...rest
}: Props) => {
  const theme = useColorScheme() ?? "light";

  const isDisabled = isLoading || disabled;

  const {
    pressable,
    pressableTap,
    text: textStyle,
    textTap,
    iconSize,
    iconColor,
  } = getButtonStyles({ variant, theme, size, isDisabled });

  const content = (pressed: boolean) => {
    if (isLoading) {
      return (
        <ThemedActivityIndicator
          size="small"
          isNeutral={variant !== "link" && variant !== "flat"}
        />
      );
    }

    if (icon) {
      return (
        <Flex
          direction={iconPosition === "left" ? "row" : "row-reverse"}
          align="center"
          gap={2}>
          {icon && (
            <FontAwesome name={icon} size={iconSize} color={iconColor} />
          )}

          <Text style={[textStyle, pressed && textTap, styles.text]}>
            {text}
          </Text>
        </Flex>
      );
    }

    return (
      <Text style={[textStyle, pressed && textTap, styles.text]}>{text}</Text>
    );
  };

  return (
    <Pressable
      style={({ pressed }) => [
        pressable,
        pressed && pressableTap,
        {
          alignSelf: isCentered ? "center" : "auto",
        },
        isFullWidth && { width: "100%", borderRadius: 24 },
        !isFullWidth && { alignSelf: "flex-start" },
        style,
      ]}
      {...rest}
      disabled={isDisabled}
      children={({ pressed }) => content(pressed)}
    />
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
  },
});

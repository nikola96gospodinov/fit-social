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

type Props = PressableProps & {
  text: string;
  variant?: Variant;
  size?: Size;
  isCentered?: boolean;
  isFullWidth?: boolean;
  isLoading?: boolean;
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
  ...rest
}: Props) => {
  const theme = useColorScheme() ?? "light";

  const isDisabled = isLoading || disabled;

  const {
    pressable,
    pressableTap,
    text: textStyle,
    textTap,
  } = getButtonStyles({ variant, theme, size, isDisabled });

  return (
    <Pressable
      style={({ pressed }) => [
        pressable,
        pressed && pressableTap,
        {
          alignSelf: isCentered ? "center" : "auto",
        },
        isFullWidth && { width: "100%", borderRadius: 24 },
        style,
      ]}
      {...rest}
      disabled={isDisabled}
      children={({ pressed }) => (
        <>
          {isLoading ? (
            <ThemedActivityIndicator size="small" isNeutral />
          ) : (
            <Text style={[textStyle, pressed && textTap, styles.text]}>
              {text}
            </Text>
          )}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
  },
});

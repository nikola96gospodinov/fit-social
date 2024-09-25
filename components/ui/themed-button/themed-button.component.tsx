import {
  Pressable,
  type PressableProps,
  Text,
  useColorScheme,
  StyleSheet,
} from "react-native";
import { getButtonStyles } from "./themed-button.utils";
import { Size, Variant } from "./themed-button.types";

type Props = PressableProps & {
  text: string;
  variant?: Variant;
  size?: Size;
  isCentered?: boolean;
  isFullWidth?: boolean;
};

export const ThemedButton = ({
  style,
  text,
  variant = "primary",
  size = "md",
  isCentered = false,
  isFullWidth = false,
  ...rest
}: Props) => {
  const theme = useColorScheme() ?? "light";

  const {
    pressable,
    pressableTap,
    text: textStyle,
    textTap,
  } = getButtonStyles({ variant, theme, size });

  return (
    <Pressable
      style={({ pressed }) => [
        pressable,
        pressed && pressableTap,
        {
          alignSelf: isCentered ? "center" : "auto",
          width: isFullWidth ? "100%" : "auto",
        },
        style,
      ]}
      {...rest}
      children={({ pressed }) => (
        <Text style={[textStyle, pressed && textTap, styles.text]}>{text}</Text>
      )}
    />
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
  },
});

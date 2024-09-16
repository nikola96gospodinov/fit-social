import {
  Pressable,
  type PressableProps,
  Text,
  useColorScheme,
} from "react-native";
import { getButtonStyles } from "./themed-button.utils";
import { Size, Variant } from "./themed-button.types";

type Props = PressableProps & {
  text: string;
  variant?: Variant;
  size?: Size;
  isCentered?: boolean;
};

export const ThemedButton = ({
  style,
  text,
  variant = "primary",
  size = "md",
  isCentered = false,
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
      style={({ pressed }) => [pressable, pressed && pressableTap, style]}
      {...rest}
      children={({ pressed }) => (
        <Text
          style={[
            textStyle,
            pressed && textTap,
            {
              alignSelf: isCentered ? "center" : "auto",
            },
          ]}>
          {text}
        </Text>
      )}
    />
  );
};

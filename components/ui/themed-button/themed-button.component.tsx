import {
  Pressable,
  type PressableProps,
  Text,
  useColorScheme,
} from "react-native";
import { styles } from "./themed-button.styles";

type Props = PressableProps & {
  lightColor?: string;
  darkColor?: string;
  text: string;
};

export const ThemedButton = ({
  style,
  lightColor,
  darkColor,
  text,
  ...rest
}: Props) => {
  const theme = useColorScheme() ?? "light";

  const pressableStyles = theme === "light" ? styles.light : styles.dark;
  const textStyles = theme === "light" ? styles.lightText : styles.darkText;
  const onTapStyles = theme === "light" ? styles.lightOnTap : styles.darkOnTap;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressableStyles,
        pressed && onTapStyles,
      ]}
      {...rest}
    >
      <Text style={[textStyles]}>{text}</Text>
    </Pressable>
  );
};

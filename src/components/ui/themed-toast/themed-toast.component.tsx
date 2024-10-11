import { colors } from "@/src/constants/colors.constants";
import { useColorScheme } from "react-native";
import Toast, { ToastProps } from "react-native-root-toast";
import { StyleSheet } from "react-native";

type Props = ToastProps & {
  text: string;
  type?: "success" | "error" | "info";
};

export const ThemedToastComponent = ({
  text,
  type = "info",
  ...props
}: Props) => {
  const theme = useColorScheme() ?? "light";

  const colorValues = (() => {
    switch (type) {
      case "success":
        return {
          border: colors[theme].success,
          background: colors[theme].successBackground,
          text: colors[theme].successText,
        };
      case "error":
        return {
          border: colors[theme].destructiveBorder,
          background: colors[theme].destructiveBackground,
          text: colors[theme].destructiveText,
        };
      default:
        return {
          border: colors[theme].tintText,
          background: colors[theme].tintActiveBackground,
          text: colors[theme].text,
        };
    }
  })();

  return (
    <Toast
      backgroundColor={colorValues.background}
      textColor={colorValues.text}
      delay={0}
      duration={Toast.durations.LONG}
      position={Toast.positions.TOP}
      animation
      hideOnPress
      opacity={1}
      containerStyle={[
        styles.container,
        {
          borderLeftColor: colorValues.border,
        },
      ]}
      {...props}>
      {text}
    </Toast>
  );
};

const styles = StyleSheet.create({
  container: {
    borderLeftWidth: 5,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});

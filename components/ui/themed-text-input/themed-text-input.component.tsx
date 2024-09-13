import {
  TextInput,
  useColorScheme,
  type TextInputProps,
  StyleSheet,
  Pressable,
} from "react-native";
import { Mode } from "./themed-text-input.types";
import { getModeStyles } from "./themed-text-input.utils";
import { ComponentProps, useState } from "react";
import { Flex } from "../layout/flex/flex.component";
import { spacing } from "@/constants/spacing.constants";
import { Ionicons } from "@expo/vector-icons";
import { IconProps } from "@expo/vector-icons/build/createIconSet";
import { colors } from "@/constants/colors.constants";

type Props = TextInputProps & {
  mode?: Mode;
  icon?: IconProps<ComponentProps<typeof Ionicons>["name"]>;
  clearButton?: boolean;
};

export const ThemedTextInput = ({
  style,
  mode = "default",
  icon,
  clearButton,
  ...rest
}: Props) => {
  const [isFocused, setIsFocused] = useState(false);

  const theme = useColorScheme() ?? "light";

  const { input, container } = getModeStyles({ mode, theme, isFocused });

  const showClearButton = clearButton && Number(rest.value?.length) > 0;

  return (
    <Flex direction="row" gap={spacing[0.5]} align="center" style={{ flex: 1 }}>
      <Flex
        direction="row"
        gap={spacing[0.5]}
        align="center"
        style={[styles.defaultContainer, container, { flex: 1 }]}>
        {icon && <Ionicons color={colors[theme].icon} {...icon} />}

        <TextInput
          {...rest}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={[{ flex: 1, maxHeight: 20 }, input]}
        />

        {showClearButton && (
          <Pressable onPress={() => rest.onChangeText?.("")}>
            <Ionicons
              name="close-circle"
              size={20}
              color={colors[theme].icon}
              style={{ marginVertical: -2 }}
            />
          </Pressable>
        )}
      </Flex>
    </Flex>
  );
};

const styles = StyleSheet.create({
  defaultContainer: {
    padding: 8,
    borderRadius: 24,
  },
});

import {
  TextInput,
  useColorScheme,
  type TextInputProps,
  StyleSheet,
  Pressable,
  DimensionValue,
} from "react-native";
import { Mode, Size } from "./themed-text-input.types";
import { getModeStyles, getSizeStyles } from "./themed-text-input.utils";
import { ComponentProps, useState } from "react";
import { Flex } from "../layout/flex/flex.component";
import { spacing } from "@/constants/spacing.constants";
import { Ionicons } from "@expo/vector-icons";
import { IconProps } from "@expo/vector-icons/build/createIconSet";
import { colors } from "@/constants/colors.constants";

type Props = TextInputProps & {
  mode?: Mode;
  size?: Size;
  icon?: IconProps<ComponentProps<typeof Ionicons>["name"]>;
  clearButton?: boolean;
  width?: DimensionValue;
  centerContent?: boolean;
};

export const ThemedTextInput = ({
  style,
  mode = "default",
  size = "default",
  icon,
  clearButton,
  width,
  centerContent,
  ...rest
}: Props) => {
  const [isFocused, setIsFocused] = useState(false);

  const theme = useColorScheme() ?? "light";

  const { input, container } = getModeStyles({ mode, theme, isFocused });
  const { container: sizeContainer } = getSizeStyles({ size, isIcon: !!icon });

  const showClearButton = clearButton && Number(rest.value?.length) > 0;

  return (
    <Flex direction="row" gap={spacing[0.5]} align="center" style={{ width }}>
      <Flex
        direction="row"
        gap={spacing[0.5]}
        align="center"
        style={[styles.defaultContainer, container, sizeContainer]}>
        {icon && <Ionicons color={colors[theme].icon} {...icon} />}

        <TextInput
          {...rest}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={[
            {
              textAlign: centerContent ? "center" : "auto",
            },
            input,
            styles.defaultInput,
          ]}
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
    flex: 1,
  },

  defaultInput: {
    flex: 1,
    maxHeight: 20,
  },
});

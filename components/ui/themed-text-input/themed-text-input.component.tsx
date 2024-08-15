import {
  TextInput,
  useColorScheme,
  type TextInputProps,
  StyleSheet,
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
};

export const ThemedTextInput = ({
  style,
  mode = "default",
  icon,
  ...rest
}: Props) => {
  const [isFocused, setIsFocused] = useState(false);

  const theme = useColorScheme() ?? "light";

  const { input, container } = getModeStyles({ mode, theme, isFocused });

  return (
    <Flex direction="row" gap={spacing[0.5]} align="center" style={{ flex: 1 }}>
      <Flex
        direction="row"
        gap={spacing[0.5]}
        align="center"
        style={[styles.defaultContainer, container, { flex: 1 }]}
      >
        {icon && <Ionicons color={colors[theme].icon} {...icon} />}

        <TextInput
          {...rest}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={[{ flex: 1 }, input]}
        />
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

import {
  TextInput,
  useColorScheme,
  type TextInputProps,
  StyleSheet,
  Pressable,
  DimensionValue,
} from "react-native";
import { Size } from "./themed-text-input.types";
import { getModeStyles, getSizeStyles } from "./themed-text-input.utils";
import { ComponentProps, useState } from "react";
import { Flex } from "../layout/flex/flex.component";
import { spacing } from "@/constants/spacing.constants";
import { Ionicons } from "@expo/vector-icons";
import { IconProps } from "@expo/vector-icons/build/createIconSet";
import { colors } from "@/constants/colors.constants";
import { FormError } from "@/components/error/form-error/form-error.component";
import { VerticalSpacing } from "../layout/vertical-spacing/vertical-spacing.component";

export type ThemedTextInputProps = TextInputProps & {
  size?: Size;
  icon?: IconProps<ComponentProps<typeof Ionicons>["name"]>;
  clearButton?: boolean;
  width?: DimensionValue;
  centerContent?: boolean;
  error?: string;
};

export const ThemedTextInput = ({
  style,
  size = "default",
  icon,
  clearButton,
  width,
  centerContent,
  secureTextEntry: defaultSecureTextEntry,
  error,
  ...rest
}: ThemedTextInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(
    defaultSecureTextEntry,
  );

  const theme = useColorScheme() ?? "light";

  const { input, container } = getModeStyles({
    isError: !!error,
    theme,
    isFocused,
  });
  const { container: sizeContainer } = getSizeStyles({ size, isIcon: !!icon });

  const isValue = Number(rest.value?.length) > 0;

  const showClearButton = !defaultSecureTextEntry && clearButton && isValue;

  const showPasswordToggleButton = defaultSecureTextEntry && isValue;

  return (
    <>
      <Flex direction="row" gap={spacing[0.5]} align="center" style={{ width }}>
        <Flex
          direction="row"
          gap={spacing[0.5]}
          align="center"
          style={[styles.defaultContainer, container, sizeContainer]}>
          {icon && <Ionicons color={colors[theme].icon} {...icon} />}

          <TextInput
            {...rest}
            secureTextEntry={secureTextEntry}
            onFocus={() => setIsFocused(true)}
            onBlur={(e) => {
              setIsFocused(false);
              rest.onBlur?.(e);
            }}
            style={[
              {
                textAlign: centerContent ? "center" : "auto",
              },
              input,
              styles.defaultInput,
            ]}
          />

          {showClearButton && <ClearButton onChangeText={rest.onChangeText} />}

          {showPasswordToggleButton && (
            <PasswordToggleButton
              secureTextEntry={secureTextEntry}
              setSecureTextEntry={setSecureTextEntry}
            />
          )}
        </Flex>
      </Flex>

      {error && (
        <>
          <VerticalSpacing size={spacing[0.5]} />

          <FormError error={error} />
        </>
      )}
    </>
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

type ClearButtonProps = {
  onChangeText: TextInputProps["onChangeText"];
};

const ClearButton = ({ onChangeText }: ClearButtonProps) => {
  const theme = useColorScheme() ?? "light";

  return (
    <Pressable onPress={() => onChangeText?.("")}>
      <Ionicons name="close-circle" size={20} color={colors[theme].icon} />
    </Pressable>
  );
};

type PasswordToggleButtonProps = {
  secureTextEntry: boolean | undefined;
  setSecureTextEntry: React.Dispatch<React.SetStateAction<boolean | undefined>>;
};

const PasswordToggleButton = ({
  secureTextEntry,
  setSecureTextEntry,
}: PasswordToggleButtonProps) => {
  const theme = useColorScheme() ?? "light";

  return (
    <Pressable onPress={() => setSecureTextEntry((prev) => !prev)}>
      <Ionicons
        name={secureTextEntry ? "eye" : "eye-off"}
        size={20}
        color={colors[theme].icon}
      />
    </Pressable>
  );
};

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
import { Flex } from "../../layout/flex/flex.component";
import { spacing } from "@/src/constants/spacing.constants";
import { Ionicons } from "@expo/vector-icons";
import { IconProps } from "@expo/vector-icons/build/createIconSet";
import { colors } from "@/src/constants/colors.constants";
import { FormError } from "@/src/components/error/form-error/form-error.component";
import { VerticalSpacing } from "../../layout/vertical-spacing/vertical-spacing.component";
import {
  ThemedText,
  ThemedTextProps,
} from "../../themed-text/themed-text.component";

export type ThemedTextInputProps = TextInputProps & {
  size?: Size;
  icon?: IconProps<ComponentProps<typeof Ionicons>["name"]>;
  clearButton?: boolean;
  width?: DimensionValue;
  centerContent?: boolean;
  error?: string;
  ref?: React.Ref<TextInput>;
  label?: string;
  prefix?: string;
  prefixColor?: ThemedTextProps["color"];
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
  ref,
  label,
  prefix,
  prefixColor,
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
      {label && (
        <>
          <ThemedText
            type={size === "small" ? "extraSmall" : "small"}
            color="supporting">
            {label}
          </ThemedText>

          <VerticalSpacing size={spacing[0.5]} />
        </>
      )}

      <Flex direction="row" gap={spacing[0.5]} align="center" style={{ width }}>
        <Flex
          direction="row"
          gap={spacing[0.5]}
          align="center"
          style={[styles.defaultContainer, container, sizeContainer]}>
          {icon && <Ionicons color={colors[theme].icon} {...icon} />}

          {prefix && (
            <ThemedText style={styles.prefix} type="small" color={prefixColor}>
              {prefix}
            </ThemedText>
          )}

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
              rest.multiline && styles.textArea,
            ]}
            ref={ref}
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

  textArea: {
    minHeight: 48,
    textAlignVertical: "top",
  },

  prefix: {
    marginRight: -spacing[0.5],
  },
});

type ClearButtonProps = {
  onChangeText: TextInputProps["onChangeText"];
};

const ClearButton = ({ onChangeText }: ClearButtonProps) => {
  const theme = useColorScheme() ?? "light";

  return (
    <Pressable onPress={() => onChangeText?.("")}>
      <Ionicons name="close-circle" size={18} color={colors[theme].icon} />
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

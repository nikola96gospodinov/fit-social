import { Switch, SwitchProps, useColorScheme } from "react-native";
import { colors } from "@/src/constants/colors.constants";
import { Flex } from "../../layout/flex/flex.component";
import { ThemedText } from "../../themed-text/themed-text.component";
import { FormError } from "@/src/components/error/form-error/form-error.component";
import { VerticalSpacing } from "../../layout/vertical-spacing/vertical-spacing.component";

export type ThemedSwitchProps = SwitchProps & {
  size?: "small" | "default";
  label?: string;
  error?: string;
  ref?: React.Ref<Switch>;
};

export const ThemedSwitch = ({
  size = "default",
  label,
  error,
  ref,
  ...props
}: ThemedSwitchProps) => {
  const theme = useColorScheme() ?? "light";

  return (
    <>
      <Flex direction="row" align="center" justify="space-between">
        {label && <ThemedText type={size}>{label}</ThemedText>}

        <Switch
          ref={ref}
          trackColor={{
            false: colors[theme].sectionBackground,
            true: colors[theme].tintBackground,
          }}
          ios_backgroundColor={colors[theme].sectionBackground}
          thumbColor={colors[theme].background}
          style={{
            transform: [{ scale: size === "small" ? 0.7 : 0.8 }],
          }}
          {...props}
        />
      </Flex>

      {error && (
        <>
          <VerticalSpacing size={0.5} />

          <FormError error={error} />
        </>
      )}
    </>
  );
};

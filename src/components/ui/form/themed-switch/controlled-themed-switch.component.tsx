import { Controller, FieldValues, UseControllerProps } from "react-hook-form";
import { Switch } from "react-native";
import { ThemedSwitch, ThemedSwitchProps } from "./themed-switch.component";
import { forwardRef } from "react";

type WithForwardRefType = React.FC<Props<FieldValues>> & {
  <T extends FieldValues>(props: Props<T>): ReturnType<React.FC<Props<T>>>;
};

type Props<T extends FieldValues> = Omit<UseControllerProps<T>, "render"> &
  ThemedSwitchProps;

// We get all the type safety necessary despite the ts-ignore
// @ts-ignore
export const ControlledThemedSwitch: WithForwardRefType = forwardRef<
  Switch,
  Props<FieldValues>
>(
  <T extends FieldValues>(
    { control, name, rules, defaultValue, shouldUnregister, ...rest }: Props<T>,
    ref: React.Ref<Switch>,
  ) => {
    return (
      <Controller
        control={control}
        name={name}
        rules={rules}
        defaultValue={defaultValue}
        shouldUnregister={shouldUnregister}
        render={({ field, formState: { errors } }) => {
          return (
            <ThemedSwitch
              {...field}
              {...rest}
              error={errors[field.name]?.message?.toString()}
              onValueChange={field.onChange}
              value={field.value}
              ref={ref}
            />
          );
        }}
      />
    );
  },
);

ControlledThemedSwitch.displayName = "ControlledThemedSwitch";

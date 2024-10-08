import { forwardRef } from "react";
import {
  ThemedTextInput,
  ThemedTextInputProps,
} from "./themed-text-input.component";
import { Controller, FieldValues, UseControllerProps } from "react-hook-form";
import { TextInput } from "react-native";

type WithForwardRefType = React.FC<Props<FieldValues>> & {
  <T extends FieldValues>(props: Props<T>): ReturnType<React.FC<Props<T>>>;
};

type Props<T extends FieldValues> = Omit<UseControllerProps<T>, "render"> &
  ThemedTextInputProps;

// We get all the type safety necessary despite the ts-ignore
// @ts-ignore
export const ControlledThemedTextInput: WithForwardRefType = forwardRef<
  TextInput,
  Props<FieldValues>
>(
  <T extends FieldValues>(
    { control, name, rules, defaultValue, shouldUnregister, ...rest }: Props<T>,
    ref: React.Ref<TextInput>,
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
            <ThemedTextInput
              {...field}
              {...rest}
              onChangeText={field.onChange}
              error={errors[field.name]?.message?.toString()}
              ref={ref}
            />
          );
        }}
      />
    );
  },
);

ControlledThemedTextInput.displayName = "ControlledThemedTextInput";

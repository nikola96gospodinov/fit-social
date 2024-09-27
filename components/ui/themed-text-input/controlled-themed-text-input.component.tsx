import {
  ThemedTextInput,
  ThemedTextInputProps,
} from "./themed-text-input.component";
import { Controller, FieldValues, UseControllerProps } from "react-hook-form";

type Props<T extends FieldValues> = Omit<UseControllerProps<T>, "render"> &
  ThemedTextInputProps;

export const ControlledThemedTextInput = <T extends FieldValues>({
  control,
  name,
  rules,
  defaultValue,
  shouldUnregister,
  ...rest
}: Props<T>) => {
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
          />
        );
      }}
    />
  );
};

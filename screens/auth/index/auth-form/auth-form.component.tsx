import { VerticalSpacing } from "@/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ThemedButton } from "@/components/ui/themed-button/themed-button.component";
import { router } from "expo-router";
import { capitalize } from "lodash";
import { LOGIN, LoginAction } from "../auth-content.constants";
import { useForm } from "react-hook-form";
import { ControlledThemedTextInput } from "@/components/ui/themed-text-input/controlled-themed-text-input.component";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthFormValues, authFormSchema } from "./auth-form.schema";
import { useLogin } from "@/services/auth/login.service";
import { useEffect } from "react";
import { NetworkError } from "@/components/error/network-error/network-error.component";

type Props = {
  activeAction: LoginAction;
};

export const AuthForm = ({ activeAction }: Props) => {
  const { control, handleSubmit, reset } = useForm<AuthFormValues>({
    resolver: zodResolver(authFormSchema(activeAction)),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    reset();
  }, [activeAction, reset]);

  const {
    mutate: login,
    error: loginError,
    isPending: isLoginPending,
  } = useLogin();

  const onSubmit = (data: AuthFormValues) => {
    if (activeAction === LOGIN)
      login(data, { onSuccess: () => router.push("/(tabs)") });
  };

  const isLoginError = loginError && activeAction === LOGIN;

  return (
    <>
      <ControlledThemedTextInput
        control={control}
        name="email"
        keyboardType="email-address"
        autoCapitalize="none"
        clearButton
        icon={{ name: "at", size: 20 }}
      />

      <VerticalSpacing size={4} />

      <ControlledThemedTextInput
        control={control}
        name="password"
        secureTextEntry
        autoCapitalize="none"
        clearButton
        icon={{ name: "lock-closed-outline", size: 20 }}
      />

      <VerticalSpacing size={6} />

      <ThemedButton
        text={capitalize(activeAction)}
        onPress={handleSubmit(onSubmit)}
        isFullWidth
        isCentered
        isLoading={isLoginPending}
      />

      {isLoginError && (
        <>
          <VerticalSpacing size={4} />

          <NetworkError message={loginError.message} />
        </>
      )}
    </>
  );
};

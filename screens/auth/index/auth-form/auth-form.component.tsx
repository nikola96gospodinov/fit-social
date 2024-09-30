import { VerticalSpacing } from "@/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ThemedButton } from "@/components/ui/themed-button/themed-button.component";
import { router } from "expo-router";
import { capitalize } from "lodash";
import { LOGIN, LoginAction, REGISTER } from "../auth-content.constants";
import { useForm } from "react-hook-form";
import { ControlledThemedTextInput } from "@/components/ui/themed-text-input/controlled-themed-text-input.component";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthFormValues, authFormSchema } from "./auth-form.schema";
import { useLogin } from "@/services/auth/login.service";
import { useEffect } from "react";
import { NetworkError } from "@/components/error/network-error/network-error.component";
import { useRegister } from "@/services/auth/register.service";
import { SlideContent } from "@/components/animation/slide-content.component";

type Props = {
  activeAction: LoginAction;
};

export const AuthForm = ({ activeAction }: Props) => {
  const { control, handleSubmit, reset } = useForm<AuthFormValues>({
    resolver: zodResolver(authFormSchema(activeAction)),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onSubmitSuccess = () => router.push("/(tabs)");

  const {
    mutate: login,
    error: loginError,
    isPending: isLoginPending,
    reset: resetLogin,
  } = useLogin();

  const {
    mutate: register,
    error: registerError,
    isPending: isRegisterPending,
    reset: resetRegister,
  } = useRegister();

  useEffect(() => {
    resetLogin();
    resetRegister();
    reset();
  }, [activeAction, resetLogin, resetRegister, reset]);

  const onSubmit = (data: AuthFormValues) => {
    if (activeAction === LOGIN) login(data, { onSuccess: onSubmitSuccess });
    else register(data, { onSuccess: onSubmitSuccess });
  };

  const isLoginError = loginError && activeAction === LOGIN;
  const isRegisterError = registerError && activeAction === REGISTER;

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
        isLoading={isLoginPending || isRegisterPending}
      />

      <SlideContent isVisible={!!isLoginError}>
        <VerticalSpacing size={4} />

        <NetworkError message={loginError?.message} />
      </SlideContent>

      <SlideContent isVisible={!!isRegisterError}>
        <VerticalSpacing size={4} />

        <NetworkError message={registerError?.message} />
      </SlideContent>
    </>
  );
};

import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ThemedButton } from "@/src/components/ui/themed-button/themed-button.component";
import { router } from "expo-router";
import { capitalize } from "lodash";
import { LOGIN, LoginAction, REGISTER } from "../auth-content.constants";
import { useForm } from "react-hook-form";
import { ControlledThemedTextInput } from "@/src/components/ui/form/themed-text-input/controlled-themed-text-input.component";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthFormValues, authFormSchema } from "./auth-form.schema";
import { useLogin } from "@/src/services/auth/login.service";
import { useEffect } from "react";
import { NetworkError } from "@/src/components/error/network-error/network-error.component";
import { useRegister } from "@/src/services/auth/register.service";
import { SlideContent } from "@/src/components/animation/slide-content.component";

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
        icon={{ name: "mail-outline", size: 20 }}
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

      <SlideContent isVisible={!!isLoginError} isFullWidth>
        <VerticalSpacing size={4} />

        <NetworkError message={loginError?.message} />
      </SlideContent>

      <SlideContent isVisible={!!isRegisterError} isFullWidth>
        <VerticalSpacing size={4} />

        <NetworkError message={registerError?.message} />
      </SlideContent>
    </>
  );
};

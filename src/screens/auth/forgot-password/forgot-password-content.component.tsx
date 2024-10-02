import { FullScreenCenteredView } from "@/src/components/ui/layout/full-screen-centered-view/full-screen-centered-view.component";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ThemedButton } from "@/src/components/ui/themed-button/themed-button.component";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import {
  ForgotPasswordSchema,
  forgotPasswordSchema,
} from "./forgot-password.schema";
import { ControlledThemedTextInput } from "@/src/components/ui/themed-text-input/controlled-themed-text-input.component";
import { useResetPassword } from "@/src/services/auth/reset-password.service";
import { ConfirmationBox } from "@/src/components/confirmation-box/confirmation-box.component";
import { SlideContent } from "@/src/components/animation/slide-content.component";
import { NetworkError } from "@/src/components/error/network-error/network-error.component";

export const ForgotPasswordContent = () => {
  const { control, handleSubmit } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const {
    mutate: resetPassword,
    isPending,
    isSuccess,
    error,
  } = useResetPassword();

  const onSubmit = (data: ForgotPasswordSchema) => {
    resetPassword(data.email);
  };

  return (
    <FullScreenCenteredView>
      <ThemedText type="title" style={{ alignSelf: "flex-start" }}>
        Forgot password?
      </ThemedText>

      <VerticalSpacing size={2} />

      <ThemedText>
        Enter your email address and we will send you a link to reset your
        password.
      </ThemedText>

      <VerticalSpacing size={8} />

      <ControlledThemedTextInput
        control={control}
        name="email"
        keyboardType="email-address"
        autoCapitalize="none"
        clearButton
        icon={{ name: "at", size: 20 }}
      />

      <VerticalSpacing size={6} />

      <ThemedButton
        text="Send reset link"
        isFullWidth
        onPress={handleSubmit(onSubmit)}
        isLoading={isPending}
      />

      <SlideContent isVisible={!!error}>
        <VerticalSpacing size={6} />

        <NetworkError message={error?.message ?? ""} />
      </SlideContent>

      <SlideContent isVisible={isSuccess}>
        <VerticalSpacing size={6} />

        <ConfirmationBox text="A reset link has been sent to your email." />
      </SlideContent>

      <VerticalSpacing size={6} />

      <ThemedButton
        text="Back to login"
        variant="link"
        onPress={() => router.back()}
      />
    </FullScreenCenteredView>
  );
};

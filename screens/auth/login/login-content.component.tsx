import { FullScreenCenteredView } from "@/components/ui/layout/full-screen-centered-view/full-screen-centered-view.component";
import { ThemedText } from "@/components/ui/themed-text/themed-text.component";
import { ThemedButton } from "@/components/ui/themed-button/themed-button.component";
import { VerticalSpacing } from "@/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { router } from "expo-router";
import { Flex } from "@/components/ui/layout/flex/flex.component";
import { LoginForm } from "./login-form/login-form.component";

export const LoginContent = () => {
  return (
    <FullScreenCenteredView>
      <ThemedText type="title">Welcome Back!</ThemedText>

      <VerticalSpacing size={10} />

      <LoginForm />

      <VerticalSpacing size={6} />

      <Flex direction="row" align="center">
        <ThemedText>Don't have an account? </ThemedText>

        <ThemedButton
          text="Register"
          onPress={() => {
            router.push("/(auth)/register");
          }}
          variant="link"
        />
      </Flex>
    </FullScreenCenteredView>
  );
};

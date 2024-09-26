import { FullScreenCenteredView } from "@/components/ui/layout/full-screen-centered-view/full-screen-centered-view.component";
import { VerticalSpacing } from "@/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ThemedButton } from "@/components/ui/themed-button/themed-button.component";
import { ThemedTextInput } from "@/components/ui/themed-text-input/themed-text-input.component";
import { ThemedText } from "@/components/ui/themed-text/themed-text.component";
import { router } from "expo-router";
import { useState } from "react";

export const ForgotPasswordContent = () => {
  const [email, setEmail] = useState("");

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

      <ThemedTextInput
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        clearButton
        icon={{ name: "at", size: 20 }}
      />

      <VerticalSpacing size={6} />

      <ThemedButton text="Send reset link" isFullWidth />

      <VerticalSpacing size={6} />

      <ThemedButton
        text="Back to login"
        variant="link"
        onPress={() => router.back()}
      />

      <VerticalSpacing size={12} />

      <ThemedButton
        text="Change password"
        variant="link"
        onPress={() => router.push("/change-password")}
      />
    </FullScreenCenteredView>
  );
};

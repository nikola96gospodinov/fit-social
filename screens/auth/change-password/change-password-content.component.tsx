import { FullScreenCenteredView } from "@/components/ui/layout/full-screen-centered-view/full-screen-centered-view.component";
import { VerticalSpacing } from "@/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ThemedButton } from "@/components/ui/themed-button/themed-button.component";
import { ThemedTextInput } from "@/components/ui/themed-text-input/themed-text-input.component";
import { ThemedText } from "@/components/ui/themed-text/themed-text.component";
import { router } from "expo-router";
import { useState } from "react";

export const ChangePasswordContent = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <FullScreenCenteredView>
      <ThemedText type="title" style={{ alignSelf: "flex-start" }}>
        Change Password
      </ThemedText>

      <VerticalSpacing size={2} />

      <ThemedText style={{ alignSelf: "flex-start" }}>
        Enter your new password below.
      </ThemedText>

      <VerticalSpacing size={8} />

      <ThemedTextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        clearButton
        icon={{ name: "lock-closed-outline", size: 20 }}
      />

      <VerticalSpacing size={4} />

      <ThemedTextInput
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        autoCapitalize="none"
        clearButton
        icon={{ name: "lock-closed", size: 20 }}
      />

      <VerticalSpacing size={6} />

      <ThemedButton text="Change password" isFullWidth />

      <VerticalSpacing size={6} />

      <ThemedButton
        text="Back to login"
        variant="link"
        onPress={() => router.push("/(auth)")}
      />
    </FullScreenCenteredView>
  );
};

import { VerticalSpacing } from "@/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ThemedButton } from "@/components/ui/themed-button/themed-button.component";
import { ThemedTextInput } from "@/components/ui/themed-text-input/themed-text-input.component";
import { router } from "expo-router";
import { useState } from "react";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <ThemedTextInput
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        clearButton
        icon={{ name: "at", size: 20 }}
      />

      <VerticalSpacing size={4} />

      <ThemedTextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        clearButton
        icon={{ name: "lock-closed-outline", size: 20 }}
      />

      <VerticalSpacing size={6} />

      <ThemedButton
        text="Login"
        onPress={() => {
          router.push("/(tabs)");
        }}
        style={{ alignSelf: "flex-start", borderRadius: 24 }}
        isFullWidth
        isCentered
      />
    </>
  );
};

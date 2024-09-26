import { VerticalSpacing } from "@/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ThemedButton } from "@/components/ui/themed-button/themed-button.component";
import { ThemedTextInput } from "@/components/ui/themed-text-input/themed-text-input.component";
import { router } from "expo-router";
import { capitalize } from "lodash";
import { useState } from "react";
import { REGISTER } from "../auth-content.constants";

type Props = {
  activeAction: "Login" | "Register";
};

export const AuthForm = ({ activeAction }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

      {activeAction === REGISTER && (
        <>
          <VerticalSpacing size={4} />

          <ThemedTextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            autoCapitalize="none"
            clearButton
            icon={{ name: "lock-closed", size: 20 }}
          />
        </>
      )}

      <VerticalSpacing size={6} />

      <ThemedButton
        text={capitalize(activeAction)}
        onPress={() => {
          router.push("/(tabs)");
        }}
        isFullWidth
        isCentered
      />
    </>
  );
};

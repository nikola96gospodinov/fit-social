import { useState } from "react";
import { FullScreenCenteredView } from "@/components/ui/layout/full-screen-centered-view/full-screen-centered-view.component";
import { ThemedText } from "@/components/ui/themed-text/themed-text.component";
import { ThemedTextInput } from "@/components/ui/themed-text-input/themed-text-input.component";
import { ThemedButton } from "@/components/ui/themed-button/themed-button.component";
import { VerticalSpacing } from "@/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { router } from "expo-router";
import { Flex } from "@/components/ui/layout/flex/flex.component";

export const LoginContent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <FullScreenCenteredView>
      <ThemedText type="title">Welcome Back!</ThemedText>

      <VerticalSpacing size={10} />

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

import { ThemedText } from "@/components/ui/themed-text/themed-text.component";
import { ThemedButton } from "@/components/ui/themed-button/themed-button.component";
import { VerticalSpacing } from "@/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { Flex } from "@/components/ui/layout/flex/flex.component";
import { AuthForm } from "./auth-form/auth-form.component";
import { ActionToggler } from "@/components/ui/action-toggler/action-toggler.component";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View } from "react-native";
import { spacing } from "@/constants/spacing.constants";
import { OrSeparator } from "@/components/or-separator/or-separator.component";
import { SocialLoginButtons } from "./social-login-buttons/social-login-buttons.component";
import { useState } from "react";
import { LOGIN, REGISTER, type LoginAction } from "./auth-content.constants";
import { router } from "expo-router";

export const AuthContent = () => {
  const insets = useSafeAreaInsets();

  const [activeAction, setActiveAction] = useState<LoginAction>(LOGIN);

  const title =
    activeAction === LOGIN ? "Welcome Back! 👋" : "Let's register 💪";

  return (
    <View
      style={{
        paddingTop: insets.top + spacing[4],
        paddingBottom: insets.bottom,
        paddingHorizontal: spacing[4],
        flex: 1,
      }}>
      <ActionToggler
        leftText={LOGIN}
        rightText={REGISTER}
        activeAction={activeAction}
        setActiveAction={setActiveAction}
      />

      <Flex align="center" justify="center" style={{ flex: 1 }}>
        <ThemedText type="title">{title}</ThemedText>

        <VerticalSpacing size={8} />

        <AuthForm activeAction={activeAction} />

        <VerticalSpacing size={6} />

        <ThemedButton
          text="Forgot password?"
          variant="link"
          size="sm"
          style={{ alignSelf: "flex-end" }}
          onPress={() => {
            router.push("/(auth)/forgot-password");
          }}
        />

        <VerticalSpacing size={6} />

        <OrSeparator />

        <VerticalSpacing size={6} />

        <SocialLoginButtons />
      </Flex>
    </View>
  );
};

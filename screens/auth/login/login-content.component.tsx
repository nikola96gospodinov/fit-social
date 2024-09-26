import { ThemedText } from "@/components/ui/themed-text/themed-text.component";
import { ThemedButton } from "@/components/ui/themed-button/themed-button.component";
import { VerticalSpacing } from "@/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { Flex } from "@/components/ui/layout/flex/flex.component";
import { LoginForm } from "./login-form/login-form.component";
import { ActionToggler } from "@/components/ui/action-toggler/action-toggler.component";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View } from "react-native";
import { spacing } from "@/constants/spacing.constants";
import { OrSeparator } from "@/components/or-separator/or-separator.component";
import { SocialLoginButtons } from "./social-login-buttons/social-login-buttons.component";

export const LoginContent = () => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingTop: insets.top + spacing[4],
        paddingBottom: insets.bottom,
        paddingHorizontal: spacing[4],
        flex: 1,
      }}>
      <ActionToggler leftText="Login" rightText="Register" />

      <Flex align="center" justify="center" style={{ flex: 1 }}>
        <ThemedText type="title">Welcome Back!</ThemedText>

        <VerticalSpacing size={8} />

        <LoginForm />

        <VerticalSpacing size={6} />

        <ThemedButton
          text="Forgot password?"
          variant="link"
          size="sm"
          style={{ alignSelf: "flex-end" }}
        />

        <VerticalSpacing size={6} />

        <OrSeparator />

        <VerticalSpacing size={6} />

        <SocialLoginButtons />
      </Flex>
    </View>
  );
};

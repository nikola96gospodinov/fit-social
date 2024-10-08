import { spacing } from "@/src/constants/spacing.constants";
import { View, StyleSheet } from "react-native";
import { useGetProfile } from "@/src/services/profile/get-profile.service";
import { ThemedActivityIndicator } from "@/src/components/ui/themed-activity-indicator/themed-activity-indicator.component";
import { EditAvatar } from "./edit-avatar/edit-avatar.component";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { useForm } from "react-hook-form";
import { ControlledThemedTextInput } from "@/src/components/ui/form/themed-text-input/controlled-themed-text-input.component";
import { ControlledThemedSwitch } from "@/src/components/ui/form/themed-switch/controlled-themed-switch.component";

export const EditProfileContent = () => {
  const { data: profile, isLoading } = useGetProfile();

  const { control } = useForm();

  if (isLoading || !profile) return <ThemedActivityIndicator />;

  return (
    <View style={styles.container}>
      <EditAvatar />

      <VerticalSpacing size={6} />

      <ControlledThemedTextInput
        name="full_name"
        control={control}
        placeholder="Full name"
      />

      <VerticalSpacing size={4} />

      <ControlledThemedTextInput
        name="username"
        control={control}
        placeholder="Username"
      />

      <VerticalSpacing size={4} />

      <ControlledThemedSwitch control={control} name="is_public" size="small" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing[4],
  },
});

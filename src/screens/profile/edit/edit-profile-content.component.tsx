import { spacing } from "@/src/constants/spacing.constants";
import { View, StyleSheet } from "react-native";
import { useGetProfile } from "@/src/services/profile/get-profile.service";
import { ThemedActivityIndicator } from "@/src/components/ui/themed-activity-indicator/themed-activity-indicator.component";
import { EditAvatar } from "./edit-avatar/edit-avatar.component";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { useForm } from "react-hook-form";
import { ControlledThemedTextInput } from "@/src/components/ui/form/themed-text-input/controlled-themed-text-input.component";
import { ControlledThemedSwitch } from "@/src/components/ui/form/themed-switch/controlled-themed-switch.component";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const editProfileSchema = z.object({
  full_name: z.string().optional(),
  username: z.string(),
  is_public: z.boolean(),
});

type EditProfileForm = z.infer<typeof editProfileSchema>;

export const EditProfileContent = () => {
  const { data: profile, isLoading } = useGetProfile();

  const { control } = useForm<EditProfileForm>({
    defaultValues: {
      full_name: profile?.full_name ?? undefined,
      username: profile?.username,
      is_public: profile?.privacy === true,
    },
    resolver: zodResolver(editProfileSchema),
  });

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

      <ControlledThemedSwitch
        control={control}
        name="is_public"
        label="Public profile"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing[4],
  },
});

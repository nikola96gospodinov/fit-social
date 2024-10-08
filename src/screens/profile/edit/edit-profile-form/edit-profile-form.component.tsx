import { ControlledThemedSwitch } from "@/src/components/ui/form/themed-switch/controlled-themed-switch.component";
import { ControlledThemedTextInput } from "@/src/components/ui/form/themed-text-input/controlled-themed-text-input.component";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { useGetProfile } from "@/src/services/profile/get-profile.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  editProfileSchema,
  EditProfileForm as EditProfileFormType,
} from "./edit-profile-form.schema";
import { ThemedButton } from "@/src/components/ui/themed-button/themed-button.component";
import { useUpdateProfile } from "@/src/services/profile/update-profile.service";

export const EditProfileForm = () => {
  const { data: profile } = useGetProfile();
  const { mutate: updateProfile, isPending } = useUpdateProfile();

  const { control, handleSubmit } = useForm<EditProfileFormType>({
    defaultValues: {
      full_name: profile?.full_name ?? undefined,
      username: profile?.username,
      is_public: profile?.is_public,
    },
    resolver: zodResolver(editProfileSchema),
  });

  return (
    <>
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

      <VerticalSpacing size={4} />

      <ThemedButton
        text="Save"
        isFullWidth
        isLoading={isPending}
        onPress={handleSubmit((data) => updateProfile(data))}
      />
    </>
  );
};

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
import { NetworkError } from "@/src/components/error/network-error/network-error.component";
import { getOnlyChangedFields } from "@/src/lib/react-hook-form/react-hook-form.utils";

export const EditProfileForm = () => {
  const { data: profile } = useGetProfile();
  const { mutate: updateProfile, isPending, error } = useUpdateProfile();

  const {
    control,
    handleSubmit,
    formState: { dirtyFields },
  } = useForm<EditProfileFormType>({
    defaultValues: {
      full_name: profile?.full_name ?? undefined,
      handle: profile?.handle,
      is_public: profile?.is_public,
      bio: profile?.bio ?? undefined,
    },
    resolver: zodResolver(editProfileSchema(profile!.id)),
  });

  const onSubmit = (data: EditProfileFormType) => {
    const changedFields = getOnlyChangedFields(data, dirtyFields);
    updateProfile({ data: changedFields, id: profile!.id });
  };

  return (
    <>
      <ControlledThemedTextInput
        name="full_name"
        control={control}
        placeholder="Full name"
        label="Full name"
      />

      <VerticalSpacing size={4} />

      <ControlledThemedTextInput
        name="handle"
        control={control}
        placeholder="Handle"
        label="Handle"
        prefix="@"
        prefixColor="tintText"
        autoCapitalize="none"
      />

      <VerticalSpacing size={4} />

      <ControlledThemedTextInput
        name="bio"
        control={control}
        placeholder="Bio"
        label="Bio"
        multiline
        numberOfLines={4}
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
        onPress={handleSubmit(onSubmit)}
      />

      {error && (
        <>
          <VerticalSpacing size={4} />

          <NetworkError message={error.message} />
        </>
      )}
    </>
  );
};

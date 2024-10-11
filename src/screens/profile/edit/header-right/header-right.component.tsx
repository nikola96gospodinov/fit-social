import { ThemedButton } from "@/src/components/ui/themed-button/themed-button.component";
import { useLogout } from "@/src/services/auth/logout.service";

export const ProfileEditHeaderRight = () => {
  const { mutate: logout, isPending } = useLogout();

  return (
    <ThemedButton
      text="Logout"
      onPress={() => logout()}
      isLoading={isPending}
      variant="link"
      iconPosition="right"
      icon="sign-out"
    />
  );
};

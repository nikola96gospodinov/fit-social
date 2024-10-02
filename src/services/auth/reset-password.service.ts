import { supabase } from "@/src/lib/supabase";
import { useMutation } from "@tanstack/react-query";

export const resetPassword = async (email: string) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "http://localhost:3000/reset-password",
  });

  if (error) {
    throw new Error(error.message);
  }
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPassword,
  });
};

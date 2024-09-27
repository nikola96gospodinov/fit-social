import { supabase } from "@/lib/supabase";
import { AuthFormValues } from "@/screens/auth/index/auth-form/auth-form.schema";
import { useMutation } from "@tanstack/react-query";

const login = async ({ email, password }: AuthFormValues) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
  });
};

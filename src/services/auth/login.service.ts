import { supabase } from "@/src/lib/supabase";
import { AuthFormValues } from "@/src/screens/auth/index/auth-form/auth-form.schema";
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
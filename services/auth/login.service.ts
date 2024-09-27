import { supabase } from "@/lib/supabase";
import { useMutation } from "@tanstack/react-query";

type LoginProps = {
  email: string;
  password: string;
};

const login = async ({ email, password }: LoginProps) => {
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

import { supabase } from "@/src/lib/supabase";
import { AuthFormValues } from "@/src/screens/auth/index/auth-form/auth-form.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SESSION_QUERY_KEY } from "./auth-keys";

const register = async ({ email, password }: AuthFormValues) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error("register", error);
    throw new Error(error.message);
  }

  return data;
};

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: register,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [SESSION_QUERY_KEY],
      });
    },
  });
};

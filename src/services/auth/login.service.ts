import { supabase } from "@/src/lib/supabase";
import { AuthFormValues } from "@/src/screens/auth/index/auth-form/auth-form.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SESSION_QUERY_KEY } from "./auth-keys";

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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [SESSION_QUERY_KEY],
      });
    },
  });
};

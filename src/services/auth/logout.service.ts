import { supabase } from "@/src/lib/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { SESSION_QUERY_KEY } from "./auth-keys";

export const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [SESSION_QUERY_KEY],
      });

      router.navigate("/(auth)");
    },
  });
};

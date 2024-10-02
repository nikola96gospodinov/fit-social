import { supabase } from "@/src/lib/supabase";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";

export const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
};

export const useLogout = () => {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      router.navigate("/(auth)");
    },
  });
};

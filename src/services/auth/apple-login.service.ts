import { supabase } from "@/src/lib/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as AppleAuthentication from "expo-apple-authentication";
import { router } from "expo-router";
import { SESSION_QUERY_KEY } from "./auth-keys";

const appleLogin = async () => {
  const credential = await AppleAuthentication.signInAsync({
    requestedScopes: [
      AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
      AppleAuthentication.AppleAuthenticationScope.EMAIL,
    ],
  });

  if (credential.identityToken) {
    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: "apple",
      token: credential.identityToken,
    });

    if (error) throw new Error(error.message);

    return data;
  }
};

export const useAppleLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: appleLogin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [SESSION_QUERY_KEY],
      });

      router.push("/(tabs)");
    },
  });
};

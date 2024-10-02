import { supabase } from "@/src/lib/supabase";
import { useMutation } from "@tanstack/react-query";
import * as AppleAuthentication from "expo-apple-authentication";
import { router } from "expo-router";

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
  return useMutation({
    mutationFn: appleLogin,
    onSuccess: () => router.push("/(tabs)"),
  });
};

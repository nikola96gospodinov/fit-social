import { supabase } from "@/src/lib/supabase";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { SESSION_QUERY_KEY } from "./auth-keys";

const googleLogin = async () => {
  GoogleSignin.configure({
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  });

  await GoogleSignin.hasPlayServices();

  const userInfo = await GoogleSignin.signIn();

  if (userInfo.data?.idToken) {
    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: "google",
      token: userInfo.data.idToken,
    });

    if (error) throw new Error(error.message);

    return data;
  } else {
    throw new Error("No idToken");
  }
};

export const useGoogleLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: googleLogin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [SESSION_QUERY_KEY],
      });

      router.push("/(tabs)");
    },
  });
};

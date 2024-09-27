import { FullScreenLoader } from "@/components/ui/full-screen-loader/full-screen-loader.component";
import { supabase } from "@/lib/supabase";
import { useGetSession } from "@/services/auth/get-session.service";
import { Redirect, Stack } from "expo-router";
import { AppState } from "react-native";

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function AuthLayout() {
  const { data: session, isLoading } = useGetSession();

  if (isLoading) {
    return <FullScreenLoader />;
  }

  if (session) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="forgot-password" />
      <Stack.Screen name="change-password" />
    </Stack>
  );
}

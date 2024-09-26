import { supabase } from "@/lib/supabase";
import { Stack } from "expo-router";
import { AppState } from "react-native";

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="forgot-password" />
      <Stack.Screen name="change-password" />
    </Stack>
  );
}

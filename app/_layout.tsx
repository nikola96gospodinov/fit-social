import { DarkTheme, DefaultTheme } from "@/constants/themes.constants";
import { queryClient } from "@/lib/react-query";
import { ThemeProvider } from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import "react-native-reanimated";
import { DevToolsBubble } from "react-native-react-query-devtools";
import { useEnableLayoutAnimation } from "@/hooks/use-enable-layout-animation";
import { useGetSession } from "@/services/session/get-session.service";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEnableLayoutAnimation();

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <QueryClientProvider client={queryClient}>
        <MainStack />
        {/* <DevToolsBubble /> */}
      </QueryClientProvider>
    </ThemeProvider>
  );
}

const MainStack = () => {
  const { data: session } = useGetSession();

  return (
    <Stack>
      {session ? (
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      )}
      <Stack.Screen name="+not-found" />
    </Stack>
  );
};

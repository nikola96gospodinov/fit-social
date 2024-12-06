import { Stack } from "expo-router";

export default function DiscoverLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Discover" }} />

      <Stack.Screen
        name="other-profile/[id]"
        options={{ title: "Loading..." }}
      />
    </Stack>
  );
}

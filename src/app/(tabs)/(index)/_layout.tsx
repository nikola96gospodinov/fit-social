import { Stack } from "expo-router";

export default function IndexLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "",
        }}
      />

      <Stack.Screen name="discover" options={{ title: "Discover" }} />

      <Stack.Screen
        name="view-workout/[id]"
        options={{ presentation: "modal" }}
      />
    </Stack>
  );
}

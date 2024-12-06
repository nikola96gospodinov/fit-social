import { FeedHeaderRight } from "@/src/screens/feed/index/header-right/feed-header-right.component";
import { Stack } from "expo-router";

export default function IndexLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Fit Social",
          headerRight: FeedHeaderRight,
        }}
      />

      <Stack.Screen
        name="notifications"
        options={{ title: "Notifications", headerBackTitle: "Feed" }}
      />

      <Stack.Screen
        name="view-workout/[id]"
        options={{ presentation: "modal" }}
      />

      <Stack.Screen
        name="workout-likes/[id]"
        options={{ presentation: "modal", title: "Likes" }}
      />

      <Stack.Screen
        name="add-comment/[id]"
        options={{ presentation: "modal", title: "Add comment" }}
      />

      <Stack.Screen
        name="other-profile/[id]"
        options={{ title: "Loading..." }}
      />
    </Stack>
  );
}

import { ProfileEditHeaderRight } from "@/src/screens/profile/edit/header-right/header-right.component";
import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false, title: "Profile" }}
      />

      <Stack.Screen
        name="edit"
        options={{
          title: "Edit profile",
          headerRight: () => <ProfileEditHeaderRight />,
        }}
      />

      <Stack.Screen
        name="set-home-gym"
        options={{ title: "Set home gym", presentation: "modal" }}
      />
    </Stack>
  );
}

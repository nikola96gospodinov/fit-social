import { EditWorkoutRightHeader } from "@/src/screens/profile/edit-workout/right-header/right-header.component";
import { ProfileEditHeaderRight } from "@/src/screens/profile/edit/header-right/header-right.component";
import { useGetProfile } from "@/src/services/profile/get-profile.service";
import { Stack } from "expo-router";

export default function ProfileLayout() {
  const { data: profile } = useGetProfile();

  const homeGymTitle = profile?.home_gym_name
    ? "Edit home gym"
    : "Set home gym";

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

      <Stack.Screen name="set-home-gym" options={{ title: homeGymTitle }} />

      <Stack.Screen
        name="edit-workout/[id]"
        options={{ title: "Edit workout", headerRight: EditWorkoutRightHeader }}
      />
    </Stack>
  );
}

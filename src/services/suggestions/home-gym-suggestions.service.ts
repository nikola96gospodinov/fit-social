import { supabase } from "@/src/lib/supabase";
import { getProfile } from "../profile/get-profile.service";
import { useQuery } from "@tanstack/react-query";
import { getFollowing } from "../follows/get-following.service";
import { HOME_GYM_SUGGESTIONS_QUERY_KEY } from "./keys";

const getHomeGymSuggestions = async () => {
  const profile = await getProfile();

  if (!profile?.home_gym_id) {
    return [];
  }

  const following = await getFollowing();
  const followingIds = following.map((f) => f.followed_id).join(",");

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("home_gym_id", profile.home_gym_id)
    .neq("id", profile.id)
    .not("id", "in", `(${followingIds})`);

  if (error) {
    console.error("getHomeGymSuggestions", error);
    throw new Error("Failed to fetch home gym suggestions");
  }

  return data;
};

export const useGetHomeGymSuggestions = () => {
  return useQuery({
    queryKey: [HOME_GYM_SUGGESTIONS_QUERY_KEY],
    queryFn: getHomeGymSuggestions,
  });
};

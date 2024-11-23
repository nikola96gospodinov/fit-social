import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { HomeGymSuggestions } from "./home-gym-suggestions/home-gym-suggestions.component";
import { MutualFollowingSuggestions } from "./mutual-following-suggestions/mutual-following-suggestions.component";

export const Suggestions = () => (
  <>
    <HomeGymSuggestions />

    <VerticalSpacing size={4} />

    <MutualFollowingSuggestions />
  </>
);

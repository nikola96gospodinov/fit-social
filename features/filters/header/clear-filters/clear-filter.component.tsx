import { ThemedButton } from "@/components/ui/themed-button/themed-button.component";
import { useExerciseFilterStore } from "@/store/exercise-filter-store";
import { useRouter } from "expo-router";

export const ClearFilter = () => {
  const { clearFilters } = useExerciseFilterStore();

  const router = useRouter();

  const onPress = () => {
    clearFilters();

    if (router.canGoBack()) {
      router.back();
    }
  };

  return <ThemedButton text="Clear" variant="flat" onPress={onPress} />;
};

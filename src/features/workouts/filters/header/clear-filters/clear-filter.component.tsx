import { ThemedButton } from "@/src/components/ui/themed-button/themed-button.component";
import { useExerciseFilterStore } from "@/src/store/exercise-filter-store";
import { useRouter } from "expo-router";

export const ClearFilter = () => {
  const { clearFilters, filters } = useExerciseFilterStore();

  const router = useRouter();

  const onPress = () => {
    clearFilters();

    if (router.canGoBack()) {
      router.back();
    }
  };

  const buttonText = filters.length > 0 ? "Clear" : "Close";

  return <ThemedButton text={buttonText} variant="flat" onPress={onPress} />;
};

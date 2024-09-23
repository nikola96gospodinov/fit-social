import { useEffect } from "react";
import { Platform, UIManager } from "react-native";

export const useEnableLayoutAnimation = () => {
  useEffect(() => {
    if (
      Platform.OS === "android" &&
      UIManager.setLayoutAnimationEnabledExperimental
    ) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);
};

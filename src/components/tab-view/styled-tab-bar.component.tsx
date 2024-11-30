import { colors } from "@/src/constants/colors.constants";
import { useColorScheme } from "react-native";
import { TabBarProps, TabBar } from "react-native-tab-view";

export const StyledTabBar = <T extends { key: string; title: string }[]>(
  props: TabBarProps<T[number]>,
) => {
  const theme = useColorScheme() ?? "light";

  return (
    <TabBar
      {...props}
      style={{ backgroundColor: colors[theme].cardBackground }}
      activeColor={colors[theme].text}
      inactiveColor={colors[theme].supportingText}
      indicatorStyle={{ backgroundColor: colors[theme].tintBackground }}
    />
  );
};

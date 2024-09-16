import { TabBarIcon } from "@/components/navigation/tab-bar-icon.component";
import { useActiveWorkoutStore } from "@/store/active-workout-store";

type Props = {
  color: string;
  focused: boolean;
};

export const WorkoutIcon = ({ color, focused }: Props) => {
  const { started } = useActiveWorkoutStore();

  const icon = started ? "barbell" : "add-circle";

  return <TabBarIcon name={focused ? icon : `${icon}-outline`} color={color} />;
};
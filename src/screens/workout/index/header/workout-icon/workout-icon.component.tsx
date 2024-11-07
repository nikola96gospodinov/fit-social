import { TabBarIcon } from "@/src/components/navigation/tab-bar-icon.component";
import { useActiveWorkoutStore } from "@/src/store/active-workout-store";

type Props = {
  color: string;
  focused: boolean;
};

export const WorkoutIcon = ({ color, focused }: Props) => {
  const {
    store: { started },
  } = useActiveWorkoutStore();

  const icon = started ? "barbell" : "add-circle";

  return <TabBarIcon name={focused ? icon : `${icon}-outline`} color={color} />;
};

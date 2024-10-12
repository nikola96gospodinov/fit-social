import { supabase } from "@/src/lib/supabase";

type Props = {
  userId: string;
};

const getWorkouts = async ({ userId }: Props) => {
  const { data, error } = await supabase
    .from("workouts")
    .select("*")
    .eq("user_id", userId);

  if (error) throw new Error(error.message);

  return data;
};

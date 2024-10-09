import { supabase } from "@/src/lib/supabase";

export const checkHandleUniqueness = async (handle: string) => {
  const result = await supabase
    .from("profiles")
    .select("*")
    .eq("handle", handle)
    .single();

  return result;
};

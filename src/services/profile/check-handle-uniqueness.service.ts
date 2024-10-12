import { supabase } from "@/src/lib/supabase";

export const checkHandleUniqueness = async (handle: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("handle", handle)
    .single();

  if (error && error.code !== "PGRST116") {
    console.error(error);

    return {
      isUnique: false,
      error: "Error checking handle uniqueness",
    };
  }

  return {
    isUnique: data?.handle !== handle,
    error: "",
  };
};

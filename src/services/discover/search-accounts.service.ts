import { supabase } from "@/src/lib/supabase";
import { useQuery } from "@tanstack/react-query";

const SEARCH_ACCOUNTS_QUERY_KEY = "searchAccounts";

const searchAccounts = async (search: string) => {
  const { data, error } = await supabase.rpc("search_profiles", {
    search_query: search,
  });

  if (error) {
    console.error("searchAccounts", error);
    throw new Error("Failed to search accounts");
  }

  return data;
};

export const useSearchAccounts = (search: string) => {
  return useQuery({
    queryKey: [SEARCH_ACCOUNTS_QUERY_KEY, search],
    queryFn: () => searchAccounts(search),
    enabled: !!search,
  });
};

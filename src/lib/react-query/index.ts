import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Number.POSITIVE_INFINITY,
      retry: 2,
      retryDelay: (attempt) => (attempt > 1 ? 2000 : 1000),
    },
  },
});

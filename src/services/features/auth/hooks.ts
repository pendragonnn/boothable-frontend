import { useQuery } from "@tanstack/react-query";

import { getMe } from "./api";

/**
 * Hook for fetching current authenticated user profile
 * Only enabled when user is authenticated
 */
export function useMe(enabled = true) {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    enabled,
    staleTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    retry: 1,
  });
}

import { useQuery } from "@tanstack/react-query";

import { fetchBoothById, adminFetchBooths } from "./api";
import type { FetchBoothsParams } from "./types";

/**
 * Hook for fetching booth detail by ID
 */
export function useBoothDetail(id: string) {
  return useQuery({
    queryKey: ["booth", id],
    queryFn: () => fetchBoothById(id),
    enabled: !!id,
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchOnWindowFocus: false,
    retry: 1,
  });
}

/**
 * Hook for fetching all booths (Admin)
 */
export function useAdminBooths(params?: FetchBoothsParams) {
  return useQuery({
    queryKey: ["admin-booths", params],
    queryFn: () => adminFetchBooths(params),
    staleTime: 2 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}

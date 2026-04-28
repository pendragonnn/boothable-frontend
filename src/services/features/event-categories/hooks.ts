import { useQuery } from "@tanstack/react-query";

import {
  fetchEventCategories,
  fetchEventCategoryById,
  adminFetchEventCategories,
} from "./api";
import type { FetchEventCategoriesParams } from "./types";

/**
 * Hook for fetching public event category list
 */
export function useEventCategoryList(params?: FetchEventCategoriesParams) {
  return useQuery({
    queryKey: ["event-categories", params],
    queryFn: () => fetchEventCategories(params),
    staleTime: 10 * 60 * 1000, // 10 minutes (categories rarely change)
    refetchOnWindowFocus: false,
  });
}

/**
 * Hook for fetching a single event category by ID
 */
export function useEventCategoryDetail(id: string) {
  return useQuery({
    queryKey: ["event-category", id],
    queryFn: () => fetchEventCategoryById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });
}

/**
 * Hook for fetching admin event categories
 */
export function useAdminEventCategories(params?: FetchEventCategoriesParams) {
  return useQuery({
    queryKey: ["admin-event-categories", params],
    queryFn: () => adminFetchEventCategories(params),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}

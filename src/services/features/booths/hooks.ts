import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { 
  fetchBoothById, 
  adminFetchBooths,
  createBooth,
  bulkCreateBooths,
  updateBooth,
  deleteBooth,
  adminUpdateBooth,
  adminDeleteBooth
} from "./api";
import type { 
  FetchBoothsParams, 
  CreateBoothRequest, 
  BulkCreateBoothsRequest, 
  UpdateBoothRequest 
} from "./types";

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

// ============================================================
// Organizer Mutations
// ============================================================

export function useCreateBooth(eventId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateBoothRequest) => createBooth(eventId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["event-booths", eventId] });
    },
  });
}

export function useBulkCreateBooths(eventId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: BulkCreateBoothsRequest) => bulkCreateBooths(eventId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["event-booths", eventId] });
    },
  });
}

export function useUpdateBooth() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateBoothRequest }) => updateBooth(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["booth", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["event-booths"] });
    },
  });
}

export function useDeleteBooth() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteBooth(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["event-booths"] });
    },
  });
}

// ============================================================
// Admin Mutations
// ============================================================

export function useAdminUpdateBooth() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateBoothRequest }) => adminUpdateBooth(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["booth", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["admin-booths"] });
      queryClient.invalidateQueries({ queryKey: ["event-booths"] });
    },
  });
}

export function useAdminDeleteBooth() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminDeleteBooth(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-booths"] });
      queryClient.invalidateQueries({ queryKey: ["event-booths"] });
    },
  });
}

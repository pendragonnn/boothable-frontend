import { useQuery, useMutation } from "@tanstack/react-query";

import {
  fetchEvents,
  fetchEventById,
  fetchEventBooths,
  fetchOrganizerEvents,
  adminFetchEvents,
  uploadEventCover,
} from "./api";
import type { FetchEventsParams } from "./types";

/**
 * Hook for fetching public event list with optional filters
 */
export function useEventList(params?: FetchEventsParams) {
  return useQuery({
    queryKey: ["events", params],
    queryFn: () => fetchEvents(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
}

/**
 * Hook for fetching a single event by ID
 */
export function useEventDetail(id: string) {
  return useQuery({
    queryKey: ["event", id],
    queryFn: () => fetchEventById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });
}

/**
 * Hook for fetching booths for a specific event
 */
export function useEventBooths(eventId: string) {
  return useQuery({
    queryKey: ["event-booths", eventId],
    queryFn: () => fetchEventBooths(eventId),
    enabled: !!eventId,
    staleTime: 2 * 60 * 1000, // 2 minutes (booth availability changes frequently)
    refetchOnWindowFocus: false,
  });
}

/**
 * Hook for fetching organizer's own events
 */
export function useOrganizerEvents(params?: FetchEventsParams) {
  return useQuery({
    queryKey: ["organizer-events", params],
    queryFn: () => fetchOrganizerEvents(params),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}

/**
 * Hook for fetching all events (Admin)
 */
export function useAdminEvents(params?: FetchEventsParams) {
  return useQuery({
    queryKey: ["admin-events", params],
    queryFn: () => adminFetchEvents(params),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}

/**
 * Hook for uploading event cover image
 */
export function useUploadEventCover() {
  return useMutation({
    mutationFn: ({ id, file }: { id: string; file: File }) =>
      uploadEventCover(id, file),
  });
}

import { useQuery } from "@tanstack/react-query";

import {
  fetchMyBookings,
  fetchBookingById,
  fetchOrganizerBookings,
  fetchOrganizerBookingById,
  fetchEventAttendees,
  adminFetchBookings,
  adminFetchBookingById,
} from "./api";
import type { FetchBookingsParams } from "./types";

/**
 * Hook for fetching vendor's own bookings
 */
export function useMyBookings(params?: FetchBookingsParams) {
  return useQuery({
    queryKey: ["my-bookings", params],
    queryFn: () => fetchMyBookings(params),
    staleTime: 2 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}

/**
 * Hook for fetching booking detail (Vendor)
 */
export function useBookingDetail(id: string) {
  return useQuery({
    queryKey: ["booking", id],
    queryFn: () => fetchBookingById(id),
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });
}

/**
 * Hook for fetching managed bookings (Organizer)
 */
export function useOrganizerBookings(params?: FetchBookingsParams) {
  return useQuery({
    queryKey: ["organizer-bookings", params],
    queryFn: () => fetchOrganizerBookings(params),
    staleTime: 2 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}

/**
 * Hook for fetching booking detail (Organizer)
 */
export function useOrganizerBookingDetail(id: string) {
  return useQuery({
    queryKey: ["organizer-booking", id],
    queryFn: () => fetchOrganizerBookingById(id),
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });
}

/**
 * Hook for fetching event attendees (Organizer)
 */
export function useEventAttendees(eventId: string) {
  return useQuery({
    queryKey: ["event-attendees", eventId],
    queryFn: () => fetchEventAttendees(eventId),
    enabled: !!eventId,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}

/**
 * Hook for fetching all bookings (Admin)
 */
export function useAdminBookings(params?: FetchBookingsParams) {
  return useQuery({
    queryKey: ["admin-bookings", params],
    queryFn: () => adminFetchBookings(params),
    staleTime: 2 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}

/**
 * Hook for fetching booking detail (Admin)
 */
export function useAdminBookingDetail(id: string) {
  return useQuery({
    queryKey: ["admin-booking", id],
    queryFn: () => adminFetchBookingById(id),
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });
}

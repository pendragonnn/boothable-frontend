import { useQuery } from "@tanstack/react-query";

import {
  fetchPaymentByBookingId,
  fetchPaymentStats,
  fetchOrganizerPayments,
  adminFetchPayments,
  adminFetchPaymentById,
} from "./api";
import type { FetchPaymentsParams } from "./types";

/**
 * Hook for fetching payment detail by booking ID (Vendor)
 */
export function usePaymentDetail(bookingId: string) {
  return useQuery({
    queryKey: ["payment", bookingId],
    queryFn: () => fetchPaymentByBookingId(bookingId),
    enabled: !!bookingId,
    staleTime: 2 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });
}

/**
 * Hook for fetching payment statistics (Organizer)
 */
export function usePaymentStats() {
  return useQuery({
    queryKey: ["payment-stats"],
    queryFn: fetchPaymentStats,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}

/**
 * Hook for fetching managed payments (Organizer)
 */
export function useOrganizerPayments(params?: FetchPaymentsParams) {
  return useQuery({
    queryKey: ["organizer-payments", params],
    queryFn: () => fetchOrganizerPayments(params),
    staleTime: 2 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}

/**
 * Hook for fetching all payments (Admin)
 */
export function useAdminPayments(params?: FetchPaymentsParams) {
  return useQuery({
    queryKey: ["admin-payments", params],
    queryFn: () => adminFetchPayments(params),
    staleTime: 2 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}

/**
 * Hook for fetching payment detail (Admin)
 */
export function useAdminPaymentDetail(id: string) {
  return useQuery({
    queryKey: ["admin-payment", id],
    queryFn: () => adminFetchPaymentById(id),
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });
}

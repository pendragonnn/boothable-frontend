import { api } from "@/lib/utils/api";

import type {
  ApiResponse,
  PaginatedResponse,
  Payment,
} from "@/services/shared";

import type {
  FetchPaymentsParams,
  VerifyPaymentRequest,
  PaymentStats,
} from "./types";

// ============================================================
// Vendor Endpoints
// ============================================================

/**
 * Upload payment proof (Vendor)
 * POST /bookings/:bookingId/payments
 */
export async function uploadPaymentProof(
  bookingId: string,
  file: File,
  paymentMethod: string,
): Promise<ApiResponse<Payment>> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("paymentMethod", paymentMethod);

  const response = await api.post<ApiResponse<Payment>>(
    `/bookings/${bookingId}/payments`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    },
  );
  return response.data;
}

/**
 * Get payment detail for a booking (Vendor)
 * GET /bookings/:bookingId/payments
 */
export async function fetchPaymentByBookingId(
  bookingId: string,
): Promise<ApiResponse<Payment>> {
  const response = await api.get<ApiResponse<Payment>>(
    `/bookings/${bookingId}/payments`,
  );
  return response.data;
}

// ============================================================
// Organizer Endpoints
// ============================================================

/**
 * Get payment statistics (Organizer)
 * GET /organizer/payments/stats
 */
export async function fetchPaymentStats(): Promise<ApiResponse<PaymentStats>> {
  const response = await api.get<ApiResponse<PaymentStats>>(
    "/organizer/payments/stats",
  );
  return response.data;
}

/**
 * Get managed payments (Organizer)
 * GET /organizer/payments
 */
export async function fetchOrganizerPayments(
  params?: FetchPaymentsParams,
): Promise<PaginatedResponse<Payment>> {
  const response = await api.get<PaginatedResponse<Payment>>(
    "/organizer/payments",
    { params },
  );
  return response.data;
}

/**
 * Verify payment (Organizer)
 * PATCH /organizer/payments/:id/verify
 */
export async function verifyPayment(
  id: string,
  data: VerifyPaymentRequest,
): Promise<ApiResponse<Payment>> {
  const response = await api.patch<ApiResponse<Payment>>(
    `/organizer/payments/${id}/verify`,
    data,
  );
  return response.data;
}

// ============================================================
// Admin Endpoints
// ============================================================

/**
 * Monitor global payments (Admin)
 * GET /admin/payments
 */
export async function adminFetchPayments(
  params?: FetchPaymentsParams,
): Promise<PaginatedResponse<Payment>> {
  const response = await api.get<PaginatedResponse<Payment>>(
    "/admin/payments",
    { params },
  );
  return response.data;
}

/**
 * Get payment detail (Admin)
 * GET /admin/payments/:id
 */
export async function adminFetchPaymentById(
  id: string,
): Promise<ApiResponse<Payment>> {
  const response = await api.get<ApiResponse<Payment>>(
    `/admin/payments/${id}`,
  );
  return response.data;
}

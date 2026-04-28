import { api } from "@/lib/utils/api";

import type {
  ApiResponse,
  PaginatedResponse,
  Booking,
  User,
} from "@/services/shared";

import type {
  FetchBookingsParams,
  CreateBookingRequest,
  UpdateBookingStatusRequest,
} from "./types";

// ============================================================
// Vendor Endpoints
// ============================================================

/**
 * Create a new booking (Vendor)
 * POST /bookings
 */
export async function createBooking(
  data: CreateBookingRequest,
): Promise<ApiResponse<Booking>> {
  const response = await api.post<ApiResponse<Booking>>(
    "/bookings",
    data,
  );
  return response.data;
}

/**
 * Get vendor's own bookings
 * GET /bookings
 */
export async function fetchMyBookings(
  params?: FetchBookingsParams,
): Promise<PaginatedResponse<Booking>> {
  const response = await api.get<PaginatedResponse<Booking>>(
    "/bookings",
    { params },
  );
  return response.data;
}

/**
 * Get booking detail (Vendor)
 * GET /bookings/:id
 */
export async function fetchBookingById(
  id: string,
): Promise<ApiResponse<Booking>> {
  const response = await api.get<ApiResponse<Booking>>(`/bookings/${id}`);
  return response.data;
}

/**
 * Cancel a booking (Vendor)
 * PATCH /bookings/:id/cancel
 */
export async function cancelBooking(
  id: string,
): Promise<ApiResponse<Booking>> {
  const response = await api.patch<ApiResponse<Booking>>(
    `/bookings/${id}/cancel`,
  );
  return response.data;
}

// ============================================================
// Organizer Endpoints
// ============================================================

/**
 * Get managed bookings (Organizer)
 * GET /organizer/bookings
 */
export async function fetchOrganizerBookings(
  params?: FetchBookingsParams,
): Promise<PaginatedResponse<Booking>> {
  const response = await api.get<PaginatedResponse<Booking>>(
    "/organizer/bookings",
    { params },
  );
  return response.data;
}

/**
 * Get booking detail (Organizer)
 * GET /organizer/bookings/:id
 */
export async function fetchOrganizerBookingById(
  id: string,
): Promise<ApiResponse<Booking>> {
  const response = await api.get<ApiResponse<Booking>>(
    `/organizer/bookings/${id}`,
  );
  return response.data;
}

/**
 * Update booking status (Organizer)
 * PATCH /organizer/bookings/:id/status
 */
export async function updateBookingStatus(
  id: string,
  data: UpdateBookingStatusRequest,
): Promise<ApiResponse<Booking>> {
  const response = await api.patch<ApiResponse<Booking>>(
    `/organizer/bookings/${id}/status`,
    data,
  );
  return response.data;
}

/**
 * Get event attendees (Organizer)
 * GET /organizer/events/:eventId/attendees
 */
export async function fetchEventAttendees(
  eventId: string,
): Promise<ApiResponse<User[]>> {
  const response = await api.get<ApiResponse<User[]>>(
    `/organizer/events/${eventId}/attendees`,
  );
  return response.data;
}

// ============================================================
// Admin Endpoints
// ============================================================

/**
 * Get all bookings (Admin)
 * GET /admin/bookings
 */
export async function adminFetchBookings(
  params?: FetchBookingsParams,
): Promise<PaginatedResponse<Booking>> {
  const response = await api.get<PaginatedResponse<Booking>>(
    "/admin/bookings",
    { params },
  );
  return response.data;
}

/**
 * Get booking detail (Admin)
 * GET /admin/bookings/:id
 */
export async function adminFetchBookingById(
  id: string,
): Promise<ApiResponse<Booking>> {
  const response = await api.get<ApiResponse<Booking>>(
    `/admin/bookings/${id}`,
  );
  return response.data;
}

/**
 * Force cancel a booking (Admin)
 * PATCH /admin/bookings/:id/force-cancel
 */
export async function adminForceCancelBooking(
  id: string,
): Promise<ApiResponse<Booking>> {
  const response = await api.patch<ApiResponse<Booking>>(
    `/admin/bookings/${id}/force-cancel`,
  );
  return response.data;
}

import { api } from "@/lib/utils/api";

import type {
  ApiResponse,
  PaginatedResponse,
  Booth,
} from "@/services/shared";

import type {
  FetchBoothsParams,
  CreateBoothRequest,
  BulkCreateBoothsRequest,
  UpdateBoothRequest,
} from "./types";

// ============================================================
// Public Endpoints
// ============================================================

/**
 * Get booth detail by ID (Public)
 * GET /booths/:id
 */
export async function fetchBoothById(id: string): Promise<ApiResponse<Booth>> {
  const response = await api.get<ApiResponse<Booth>>(`/booths/${id}`);
  return response.data;
}

// ============================================================
// Organizer Endpoints
// ============================================================

/**
 * Create a booth for an event (Organizer)
 * POST /organizer/events/:eventId/booths
 */
export async function createBooth(
  eventId: string,
  data: CreateBoothRequest,
): Promise<ApiResponse<Booth>> {
  const response = await api.post<ApiResponse<Booth>>(
    `/organizer/events/${eventId}/booths`,
    data,
  );
  return response.data;
}

/**
 * Bulk create booths for an event (Organizer)
 * POST /organizer/events/:eventId/booths/bulk
 */
export async function bulkCreateBooths(
  eventId: string,
  data: BulkCreateBoothsRequest,
): Promise<ApiResponse<Booth[]>> {
  const response = await api.post<ApiResponse<Booth[]>>(
    `/organizer/events/${eventId}/booths/bulk`,
    data,
  );
  return response.data;
}

/**
 * Update a booth (Organizer)
 * PATCH /organizer/booths/:id
 */
export async function updateBooth(
  id: string,
  data: UpdateBoothRequest,
): Promise<ApiResponse<Booth>> {
  const response = await api.patch<ApiResponse<Booth>>(
    `/organizer/booths/${id}`,
    data,
  );
  return response.data;
}

/**
 * Delete a booth (Organizer)
 * DELETE /organizer/booths/:id
 */
export async function deleteBooth(
  id: string,
): Promise<ApiResponse<{ message: string }>> {
  const response = await api.delete<ApiResponse<{ message: string }>>(
    `/organizer/booths/${id}`,
  );
  return response.data;
}

// ============================================================
// Admin Endpoints
// ============================================================

/**
 * Get all booths (Admin)
 * GET /admin/booths
 */
export async function adminFetchBooths(
  params?: FetchBoothsParams,
): Promise<PaginatedResponse<Booth>> {
  const response = await api.get<PaginatedResponse<Booth>>(
    "/admin/booths",
    { params },
  );
  return response.data;
}

/**
 * Update booth (Admin)
 * PATCH /admin/booths/:id
 */
export async function adminUpdateBooth(
  id: string,
  data: UpdateBoothRequest,
): Promise<ApiResponse<Booth>> {
  const response = await api.patch<ApiResponse<Booth>>(
    `/admin/booths/${id}`,
    data,
  );
  return response.data;
}

/**
 * Delete booth (Admin)
 * DELETE /admin/booths/:id
 */
export async function adminDeleteBooth(
  id: string,
): Promise<ApiResponse<{ message: string }>> {
  const response = await api.delete<ApiResponse<{ message: string }>>(
    `/admin/booths/${id}`,
  );
  return response.data;
}

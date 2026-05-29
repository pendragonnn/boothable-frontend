import { api } from "@/lib/utils/api";

import type {
  ApiResponse,
  PaginatedResponse,
  EventCategory,
} from "@/services/shared";

import type {
  FetchEventCategoriesParams,
  CreateEventCategoryRequest,
  UpdateEventCategoryRequest,
} from "./types";

// ============================================================
// Public Endpoints
// ============================================================

/**
 * Get all event categories (Public)
 * GET /event-categories
 */
export async function fetchEventCategories(
  params?: FetchEventCategoriesParams,
): Promise<PaginatedResponse<EventCategory>> {
  const response = await api.get<PaginatedResponse<EventCategory>>(
    "/event-categories",
    { params },
  );
  return response.data;
}

/**
 * Get event category detail (Public)
 * GET /event-categories/:id
 */
export async function fetchEventCategoryById(
  id: string,
): Promise<ApiResponse<EventCategory>> {
  const response = await api.get<ApiResponse<EventCategory>>(
    `/event-categories/${id}`,
  );
  return response.data;
}

// ============================================================
// Admin Endpoints
// ============================================================

/**
 * Create event category (Admin)
 * POST /admin/event-categories
 */
export async function adminCreateEventCategory(
  data: CreateEventCategoryRequest,
): Promise<ApiResponse<EventCategory>> {
  const response = await api.post<ApiResponse<EventCategory>>(
    "/admin/event-categories",
    data,
  );
  return response.data;
}

/**
 * Get all event categories (Admin)
 * GET /admin/event-categories
 */
export async function adminFetchEventCategories(
  params?: FetchEventCategoriesParams,
): Promise<PaginatedResponse<EventCategory>> {
  const response = await api.get<PaginatedResponse<EventCategory>>(
    "/admin/event-categories",
    { params },
  );
  return response.data;
}

/**
 * Get event category detail (Admin)
 * GET /admin/event-categories/:id
 */
export async function adminFetchEventCategoryById(
  id: string,
): Promise<ApiResponse<EventCategory>> {
  const response = await api.get<ApiResponse<EventCategory>>(
    `/admin/event-categories/${id}`,
  );
  return response.data;
}

/**
 * Update event category (Admin)
 * PATCH /admin/event-categories/:id
 */
export async function adminUpdateEventCategory(
  id: string,
  data: UpdateEventCategoryRequest,
): Promise<ApiResponse<EventCategory>> {
  const response = await api.patch<ApiResponse<EventCategory>>(
    `/admin/event-categories/${id}`,
    data,
  );
  return response.data;
}

/**
 * Delete event category (Admin)
 * DELETE /admin/event-categories/:id
 */
export async function adminDeleteEventCategory(
  id: string,
): Promise<ApiResponse<{ message: string }>> {
  const response = await api.delete<ApiResponse<{ message: string }>>(
    `/admin/event-categories/${id}`,
  );
  return response.data;
}

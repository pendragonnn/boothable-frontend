import { api } from "@/lib/utils/api";

import type {
  ApiResponse,
  PaginatedResponse,
  Event,
  Booth,
} from "@/services/shared";

import type {
  FetchEventsParams,
  CreateEventRequest,
  UpdateEventRequest,
  AdminCreateEventRequest,
} from "./types";

// ============================================================
// Public Endpoints
// ============================================================

/**
 * Get all public events with optional filters
 * GET /events
 */
export async function fetchEvents(
  params?: FetchEventsParams,
): Promise<PaginatedResponse<Event>> {
  const response = await api.get<PaginatedResponse<Event>>("/events", {
    params,
  });
  return response.data;
}

/**
 * Get event detail by ID
 * GET /events/:id
 */
export async function fetchEventById(id: string): Promise<ApiResponse<Event>> {
  const response = await api.get<ApiResponse<Event>>(`/events/${id}`);
  return response.data;
}

/**
 * Get booths for a specific event
 * GET /events/:eventId/booths
 */
export async function fetchEventBooths(
  eventId: string,
): Promise<ApiResponse<Booth[]>> {
  const response = await api.get<ApiResponse<Booth[]>>(
    `/events/${eventId}/booths`,
  );
  return response.data;
}

// ============================================================
// Organizer Endpoints
// ============================================================

/**
 * Create a new event (Organizer)
 * POST /organizer/events
 */
export async function createEvent(
  data: CreateEventRequest,
): Promise<ApiResponse<Event>> {
  const response = await api.post<ApiResponse<Event>>(
    "/organizer/events",
    data,
  );
  return response.data;
}

/**
 * Get organizer's own events
 * GET /organizer/events
 */
export async function fetchOrganizerEvents(
  params?: FetchEventsParams,
): Promise<PaginatedResponse<Event>> {
  const response = await api.get<PaginatedResponse<Event>>(
    "/organizer/events",
    { params },
  );
  return response.data;
}

/**
 * Update an event (Organizer)
 * PATCH /organizer/events/:id
 */
export async function updateEvent(
  id: string,
  data: UpdateEventRequest,
): Promise<ApiResponse<Event>> {
  const response = await api.patch<ApiResponse<Event>>(
    `/organizer/events/${id}`,
    data,
  );
  return response.data;
}

/**
 * Upload event map image (Organizer)
 * POST /organizer/events/:id/map
 */
export async function uploadEventMap(
  id: string,
  file: File,
): Promise<ApiResponse<Event>> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post<ApiResponse<Event>>(
    `/organizer/events/${id}/map`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    },
  );
  return response.data;
}

/**
 * Delete an event (Organizer)
 * DELETE /organizer/events/:id
 */
export async function deleteEvent(
  id: string,
): Promise<ApiResponse<{ message: string }>> {
  const response = await api.delete<ApiResponse<{ message: string }>>(
    `/organizer/events/${id}`,
  );
  return response.data;
}

// ============================================================
// Admin Endpoints
// ============================================================

/**
 * Create event (Admin — can assign organizer)
 * POST /admin/events
 */
export async function adminCreateEvent(
  data: AdminCreateEventRequest,
): Promise<ApiResponse<Event>> {
  const response = await api.post<ApiResponse<Event>>(
    "/admin/events",
    data,
  );
  return response.data;
}

/**
 * Get all events (Admin)
 * GET /admin/events
 */
export async function adminFetchEvents(
  params?: FetchEventsParams,
): Promise<PaginatedResponse<Event>> {
  const response = await api.get<PaginatedResponse<Event>>(
    "/admin/events",
    { params },
  );
  return response.data;
}

/**
 * Update event (Admin)
 * PATCH /admin/events/:id
 */
export async function adminUpdateEvent(
  id: string,
  data: UpdateEventRequest,
): Promise<ApiResponse<Event>> {
  const response = await api.patch<ApiResponse<Event>>(
    `/admin/events/${id}`,
    data,
  );
  return response.data;
}

/**
 * Delete event (Admin)
 * DELETE /admin/events/:id
 */
export async function adminDeleteEvent(
  id: string,
): Promise<ApiResponse<{ message: string }>> {
  const response = await api.delete<ApiResponse<{ message: string }>>(
    `/admin/events/${id}`,
  );
  return response.data;
}

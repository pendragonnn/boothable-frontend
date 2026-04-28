import type { Event, Booth } from "@/services/shared";

// Re-export for convenience
export type { Event, Booth };

/**
 * Params for fetching public event list
 */
export interface FetchEventsParams {
  search?: string;
  page?: number;
  limit?: number;
}

/**
 * Params for creating an event (Organizer)
 */
export interface CreateEventRequest {
  eventName: string;
  categoryId: string;
  location: string;
  description?: string;
  startDate: string;
  endDate: string;
}

/**
 * Params for updating an event (Organizer)
 */
export interface UpdateEventRequest {
  eventName?: string;
  categoryId?: string;
  location?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
}

/**
 * Params for admin creating event (includes organizerId)
 */
export interface AdminCreateEventRequest extends CreateEventRequest {
  organizerId: string;
}

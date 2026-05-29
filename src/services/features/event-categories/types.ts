import type { EventCategory } from "@/services/shared";

export type { EventCategory };

export interface FetchEventCategoriesParams {
  page?: number;
  limit?: number;
}

export interface CreateEventCategoryRequest {
  name: string;
  slug: string;
  icon: string;
  description?: string;
}

export interface UpdateEventCategoryRequest {
  name?: string;
  slug?: string;
  icon?: string;
  description?: string;
}

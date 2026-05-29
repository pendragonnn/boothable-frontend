import type { Booth } from "@/services/shared";

export type { Booth };

export interface FetchBoothsParams {
  page?: number;
  limit?: number;
  eventId?: string;
  status?: string;
}

export interface CreateBoothRequest {
  boothCode: string;
  type: string;
  size: string;
  pricePerDay: number;
  status?: string;
  availableStartDate: string;
  availableEndDate: string;
  description?: string;
}

export interface BulkCreateBoothsRequest {
  booths: CreateBoothRequest[];
}

export interface UpdateBoothRequest {
  boothCode?: string;
  type?: string;
  size?: string;
  pricePerDay?: number;
  status?: string;
  availableStartDate?: string;
  availableEndDate?: string;
  description?: string;
}

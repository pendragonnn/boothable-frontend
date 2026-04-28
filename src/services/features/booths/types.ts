import type { Booth } from "@/services/shared";

export type { Booth };

export interface FetchBoothsParams {
  page?: number;
  limit?: number;
}

export interface CreateBoothRequest {
  boothCode: string;
  pricePerDay: number;
  availableStartDate: string;
  availableEndDate: string;
}

export interface BulkCreateBoothsRequest {
  booths: CreateBoothRequest[];
}

export interface UpdateBoothRequest {
  boothCode?: string;
  pricePerDay?: number;
  status?: string;
  availableStartDate?: string;
  availableEndDate?: string;
}

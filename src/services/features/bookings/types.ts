import type { Booking } from "@/services/shared";

export type { Booking };

export interface FetchBookingsParams {
  page?: number;
  limit?: number;
}

export interface CreateBookingRequest {
  boothId: string;
  rentalStartDate: string;
  rentalEndDate: string;
}

export interface UpdateBookingStatusRequest {
  status: string;
}

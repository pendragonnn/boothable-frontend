import type { Payment } from "@/services/shared";

export type { Payment };

export interface FetchPaymentsParams {
  page?: number;
  limit?: number;
}

export interface VerifyPaymentRequest {
  paymentStatus: string;
}

export interface PaymentStats {
  totalRevenue: number;
  totalPaid: number;
  totalPending: number;
  totalFailed: number;
}

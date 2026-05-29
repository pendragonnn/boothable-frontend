// ============================================================
// API Response Wrappers
// ============================================================

/**
 * Standard API response wrapper
 * Used for single-object responses
 */
export interface ApiResponse<T> {
  data: T;
}

/**
 * Paginated API response wrapper
 * Used for list responses with pagination info
 */
export interface PaginatedResponse<T> {
  data: T[];
  paging: Paging;
}

/**
 * Pagination metadata from API
 */
export interface Paging {
  page: number;
  totalPage: number;
  totalData: number;
}

// ============================================================
// Enums (matching database schema)
// ============================================================

export enum UserRole {
  VENDOR = "VENDOR",
  ORGANIZER = "ORGANIZER",
  ADMIN = "ADMIN",
}

export enum BoothStatus {
  AVAILABLE = "AVAILABLE",
  BOOKED = "BOOKED",
  UNAVAILABLE = "UNAVAILABLE",
}

export enum BookingStatus {
  PENDING = "Pending",
  APPROVED = "Approved",
  REJECTED = "Rejected",
  CANCELLED = "Cancelled",
}

export enum PaymentStatus {
  UNPAID = "UNPAID",
  PENDING = "PENDING",
  PAID = "PAID",
  FAILED = "FAILED",
}

// ============================================================
// Domain Types (matching database schema & API responses)
// ============================================================

/**
 * User entity
 */
export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

/**
 * Event Category entity
 */
export interface EventCategory {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

/**
 * Event entity
 */
export interface Event {
  id: string;
  eventName: string;
  description: string | null;
  location: string;
  startDate: string;
  endDate: string;
  eventBoothMap: string | null;
  eventCover: string | null;
  paymentVa: string | null;
  categoryId: string;
  organizerId: string;
  createdAt: string;
  updatedAt: string;
  category?: EventCategory;
  organizer?: Pick<User, "id" | "name" | "email">;
  _count?: {
    booths: number;
  };
}

/**
 * Booth entity
 */
export interface Booth {
  id: string;
  eventId: string;
  boothCode: string;
  type: string;
  size: string;
  pricePerDay: number;
  status: BoothStatus;
  availableStartDate: string;
  availableEndDate: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  event?: Pick<Event, "id" | "eventName" | "location">;
}

/**
 * Booking entity
 */
export interface Booking {
  id: string;
  boothId: string;
  vendorId: string;
  rentalStartDate: string;
  rentalEndDate: string;
  totalPrice: number;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
  booth?: Booth;
  vendor?: Pick<User, "id" | "name" | "email" | "phone">;
  payment?: Payment;
}

/**
 * Payment entity
 */
export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  paymentMethod: string;
  paymentProof: string | null;
  paymentStatus: PaymentStatus;
  paidAt: string | null;
  createdAt: string;
  updatedAt: string;
}

// ============================================================
// Auth Types
// ============================================================

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  name: string;
  phone: string;
  password: string;
  role: UserRole;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

import type {
  LoginRequest,
  RegisterRequest,
  LoginResponse,
  RefreshTokenResponse,
} from "@/services/shared";

// Re-export types for convenience
export type {
  LoginRequest,
  RegisterRequest,
  LoginResponse,
  RefreshTokenResponse,
};

// Additional auth-specific params
export interface LogoutRequest {
  refreshToken: string;
}

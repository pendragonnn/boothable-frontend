import { api } from "@/lib/utils/api";

import type { ApiResponse, User } from "@/services/shared";

import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  LogoutRequest,
  RefreshTokenResponse,
} from "./types";

/**
 * Login user with email and password
 * POST /auth/login
 */
export async function login(
  data: LoginRequest,
): Promise<ApiResponse<LoginResponse>> {
  const response = await api.post<ApiResponse<LoginResponse>>(
    "/auth/login",
    data,
  );
  return response.data;
}

/**
 * Register a new user
 * POST /auth/register
 */
export async function register(
  data: RegisterRequest,
): Promise<ApiResponse<User>> {
  const response = await api.post<ApiResponse<User>>(
    "/auth/register",
    data,
  );
  return response.data;
}

/**
 * Refresh access token using refresh token
 * Uses native fetch to avoid circular dependency with axios interceptor
 * POST /auth/refresh
 */
export async function refreshToken(
  token: string,
): Promise<ApiResponse<RefreshTokenResponse>> {
  const baseURL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

  const response = await fetch(`${baseURL}/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken: token }),
  });

  if (!response.ok) {
    throw new Error(`Refresh token failed with status ${response.status}`);
  }

  return response.json();
}

/**
 * Logout user (invalidate refresh token)
 * POST /auth/logout
 */
export async function logout(
  data: LogoutRequest,
): Promise<ApiResponse<{ message: string }>> {
  const response = await api.post<ApiResponse<{ message: string }>>(
    "/auth/logout",
    data,
  );
  return response.data;
}

/**
 * Get current user profile
 * GET /users/me
 */
export async function getMe(): Promise<ApiResponse<User>> {
  const response = await api.get<ApiResponse<User>>("/users/me");
  return response.data;
}

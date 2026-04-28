import { AxiosError } from "axios";

/**
 * Error categories for different types of errors
 */
export enum ErrorCategory {
  NETWORK = "network",
  SERVER = "server",
  NOT_FOUND = "not_found",
  UNEXPECTED = "unexpected",
}

/**
 * Structured error information
 */
export interface ErrorInfo {
  category: ErrorCategory;
  message: string;
  statusCode?: number;
}

/**
 * Categorize error based on error object
 */
export function categorizeError(error: unknown): ErrorCategory {
  if (!error) return ErrorCategory.UNEXPECTED;

  // Handle Axios errors
  if (error instanceof AxiosError) {
    // Network errors (no response received)
    if (!error.response) {
      return ErrorCategory.NETWORK;
    }

    // HTTP status-based categorization
    const status = error.response.status;
    if (status === 404) {
      return ErrorCategory.NOT_FOUND;
    }
    if (status >= 500) {
      return ErrorCategory.SERVER;
    }
  }

  // Handle generic errors with response property
  const errorObj = error as { response?: { status?: number } };
  if (errorObj.response?.status) {
    const status = errorObj.response.status;
    if (status === 404) {
      return ErrorCategory.NOT_FOUND;
    }
    if (status >= 500) {
      return ErrorCategory.SERVER;
    }
  }

  // Check for network-related error messages
  const errorWithMessage = error as { message?: string };
  if (errorWithMessage.message) {
    const message = errorWithMessage.message.toLowerCase();
    if (
      message.includes("network") ||
      message.includes("fetch") ||
      message.includes("timeout") ||
      message.includes("connection")
    ) {
      return ErrorCategory.NETWORK;
    }
  }

  return ErrorCategory.UNEXPECTED;
}

/**
 * Get user-friendly error message in Indonesian based on error category
 * Filters out technical details like stack traces and raw API errors
 */
export function getErrorMessage(error: unknown): string {
  const category = categorizeError(error);

  switch (category) {
    case ErrorCategory.NETWORK:
      return "Tidak dapat terhubung ke server. Periksa koneksi internet Anda.";

    case ErrorCategory.SERVER:
      return "Terjadi kesalahan pada server. Silakan coba lagi nanti.";

    case ErrorCategory.NOT_FOUND:
      return "Data yang Anda cari tidak ditemukan.";

    case ErrorCategory.UNEXPECTED:
    default:
      return "Terjadi kesalahan. Silakan coba lagi.";
  }
}

/**
 * Get detailed error information including category and message
 * Useful for logging or more granular error handling
 */
export function getErrorInfo(error: unknown): ErrorInfo {
  const category = categorizeError(error);
  const message = getErrorMessage(error);

  // Extract status code if available
  let statusCode: number | undefined;
  if (error instanceof AxiosError && error.response) {
    statusCode = error.response.status;
  } else {
    const errorObj = error as { response?: { status?: number } };
    statusCode = errorObj.response?.status;
  }

  return {
    category,
    message,
    statusCode,
  };
}

/**
 * Check if error is a 404 Not Found error
 */
export function isNotFoundError(error: unknown): boolean {
  return categorizeError(error) === ErrorCategory.NOT_FOUND;
}

/**
 * Check if error is a network error
 */
export function isNetworkError(error: unknown): boolean {
  return categorizeError(error) === ErrorCategory.NETWORK;
}

/**
 * Check if error is a server error (5xx)
 */
export function isServerError(error: unknown): boolean {
  return categorizeError(error) === ErrorCategory.SERVER;
}

import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import Cookies from "js-cookie";

// Shared state for refresh logic
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string | null) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Helper to get auth state from cookies
const getAuthFromCookies = () => {
  if (typeof window === "undefined") return null;

  const authCookie = Cookies.get("auth");
  if (!authCookie) return null;

  try {
    const parsed = JSON.parse(authCookie);
    return parsed.state;
  } catch {
    return null;
  }
};

// Helper to update auth tokens in cookies
const updateAuthTokens = (accessToken: string, refreshToken: string) => {
  if (typeof window === "undefined") return;

  const authCookie = Cookies.get("auth");
  if (!authCookie) return;

  try {
    const parsed = JSON.parse(authCookie);
    parsed.state.accessToken = accessToken;
    parsed.state.refreshToken = refreshToken;

    Cookies.set("auth", JSON.stringify(parsed), {
      expires: 7,
      secure: true,
      sameSite: "strict",
    });
  } catch (error) {
    console.error("[API] Failed to update auth tokens:", error);
  }
};

// Helper to clear auth tokens
const clearAuthTokens = () => {
  if (typeof window === "undefined") return;
  Cookies.remove("auth");
};

// Helper function to create axios instance with interceptors
const createApiInstance = (baseURL: string) => {
  const instance = axios.create({
    baseURL,
    timeout: 30000,
    headers: {
      "Content-Type": "application/json",
    },
    proxy: false,
  });

  // Request interceptor
  instance.interceptors.request.use(
    (config) => {
      // Add auth token if exists (only in browser environment)
      if (typeof window !== "undefined") {
        const auth = getAuthFromCookies();
        if (auth?.accessToken) {
          config.headers.Authorization = `Bearer ${auth.accessToken}`;
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  // Response interceptor
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retry?: boolean;
      };

      if (error.response) {
        // Handle 401 Unauthorized (Token Expired)
        if (error.response.status === 401 && !originalRequest._retry) {
          // If we are already refreshing, add this request to the queue
          if (isRefreshing) {
            return new Promise((resolve, reject) => {
              failedQueue.push({ resolve, reject });
            })
              .then((token) => {
                if (originalRequest.headers && token) {
                  originalRequest.headers.Authorization = `Bearer ${token}`;
                }
                return instance(originalRequest);
              })
              .catch((err) => {
                return Promise.reject(err);
              });
          }

          // If not refreshing, mark as retrying and start refresh
          originalRequest._retry = true;
          isRefreshing = true;

          try {
            const auth = getAuthFromCookies();
            if (!auth?.refreshToken) {
              throw new Error("No refresh token available");
            }

            // Use the typed refreshToken function from auth/api.ts
            // This is safe because refreshToken() uses fetch instead of the axios instance
            const { refreshToken: refreshTokenFn } =
              await import("@/services/features/auth");
            const data = await refreshTokenFn(auth.refreshToken);

            const { accessToken, refreshToken: newRefreshToken } = data.data;

            // Update cookies with new tokens
            updateAuthTokens(accessToken, newRefreshToken);

            // Set global header for future requests on this instance
            instance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

            // Process the queue of other failed requests
            processQueue(null, accessToken);

            // Retry the original failed request
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            }
            return instance(originalRequest);
          } catch (refreshError) {
            // Refresh failed (refresh token expired or invalid)
            processQueue(refreshError, null);

            if (typeof window !== "undefined") {
              clearAuthTokens();
              window.location.href = "/login";
            }

            return Promise.reject(refreshError);
          } finally {
            isRefreshing = false;
          }
        }

        // Handle other errors
        switch (error.response.status) {
          case 403:
            console.log("[API] Forbidden access");
            break;
          case 404:
            console.log("[API] Resource not found");
            break;
          case 500:
            console.log("[API] Server error");
            break;
          default:
            console.log("[API] Error:", error.response.data);
        }
      } else if (error.request) {
        console.log("[API] Network error - no response received");
      } else {
        console.log("[API] Request setup error:", error.message);
      }
      return Promise.reject(error);
    },
  );

  return instance;
};

// Main API instance (Public + Vendor access — no role prefix)
export const api = createApiInstance(
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
);

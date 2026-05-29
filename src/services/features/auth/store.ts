import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import Cookies from "js-cookie";
import { User } from "@/services/shared";

interface AuthStore {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  setAuth: (accessToken: string, refreshToken: string, user: User) => void;
  clearAuth: () => void;
  isAuthenticated: () => boolean;
}

const cookieStorage = {
  getItem: (name: string): string | null => {
    const accessToken = Cookies.get("accessToken");
    const refreshToken = Cookies.get("refreshToken");
    const userStr = Cookies.get("user");
    
    if (!accessToken && !userStr) return null;
    
    try {
      const user = userStr ? JSON.parse(userStr) : null;
      return JSON.stringify({
        state: { accessToken, refreshToken, user },
        version: 0
      });
    } catch {
      return null;
    }
  },
  setItem: (name: string, value: string): void => {
    try {
      const parsed = JSON.parse(value);
      const { accessToken, refreshToken, user } = parsed.state;
      
      if (accessToken) Cookies.set("accessToken", accessToken, { expires: 7, secure: true, sameSite: "strict" });
      else Cookies.remove("accessToken");
      
      if (refreshToken) Cookies.set("refreshToken", refreshToken, { expires: 7, secure: true, sameSite: "strict" });
      else Cookies.remove("refreshToken");
      
      if (user) Cookies.set("user", JSON.stringify(user), { expires: 7, secure: true, sameSite: "strict" });
      else Cookies.remove("user");
    } catch (e) {
      console.error("Failed to save auth state to cookies", e);
    }
  },
  removeItem: (name: string): void => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    Cookies.remove("user");
  },
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      setAuth: (accessToken, refreshToken, user) => {
        set({ accessToken, refreshToken, user });
      },
      clearAuth: () => {
        set({ accessToken: null, refreshToken: null, user: null });
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        Cookies.remove("user");
      },
      isAuthenticated: () => {
        return !!get().accessToken && !!get().user;
      },
    }),
    {
      name: "auth", // This must match the cookie key expected in api.ts
      storage: createJSONStorage(() => cookieStorage),
      partialize: (state) => ({ 
        accessToken: state.accessToken, 
        refreshToken: state.refreshToken, 
        user: state.user 
      }), // Persist only the tokens and user
    }
  )
);

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface AuthUser {
  id: string;
  email: string;
  username: string;
  avatarUrl: string | null;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

interface AuthState {
  accessToken: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  setAuth: (token: string, user?: AuthUser | null) => void;
  setAccessToken: (token: string) => void;
  setUser: (user: AuthUser | null) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      user: null,
      isAuthenticated: false,

      setAuth: (token: string, user = null) =>
        set({
          accessToken: token,
          user: user ?? get().user,
          isAuthenticated: true,
        }),

      setAccessToken: (token: string) =>
        set({
          accessToken: token,
          isAuthenticated: true,
        }),

      setUser: (user: AuthUser | null) =>
        set({
          user,
        }),

      clearAuth: () =>
        set({
          accessToken: null,
          user: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "bridgeroom-auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        accessToken: state.accessToken,
        user: state.user,
        isAuthenticated: !!state.accessToken,
      }),
    },
  ),
);

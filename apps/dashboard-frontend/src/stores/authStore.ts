import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  token: string | null;
  userId: string | null;
  setToken: (token: string | null) => void;
  setUserId: (userId: string | null) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      userId: null,
      setToken: (token) => set({ token }),
      setUserId: (userId) => set({ userId }),
      clearAuth: () => set({ token: null, userId: null }),
    }),
    {
      name: "auth-storage", // key in localStorage
      partialize: (state) => ({ token: state.token, userId: state.userId }), // persist token and userId
    }
  )
);

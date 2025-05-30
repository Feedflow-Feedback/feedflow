import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserState = {
  email: string | null;
  projectIds: string[] | null;
  setEmail: (email: string | null) => void;
  setProjectIds: (projectIds: string[] | null) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      email: null,
      projectIds: null,
      setEmail: (email) => set({ email }),
      setProjectIds: (projectIds) => set({ projectIds }),
      clearUser: () => set({ email: null }),
    }),
    {
      name: "user-storage", // key in localStorage
      partialize: (state) => ({
        email: state.email,
        projectIds: state.projectIds,
      }),
    }
  )
);

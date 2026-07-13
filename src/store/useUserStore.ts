import { create } from "zustand";
import type { UserRole } from "@/types";

interface StoreUser {
  id: string;
  name: string;
  email: string;
  photoURL: string;
  role: UserRole;
  credits: number;
}

interface UserState {
  user: StoreUser | null;
  setUser: (user: StoreUser) => void;
  clearUser: () => void;
  updateCredits: (newCredits: number) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  updateCredits: (newCredits) =>
    set((state) =>
      state.user ? { user: { ...state.user, credits: newCredits } } : state,
    ),
}));

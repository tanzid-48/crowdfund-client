"use client";

import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import { authClient } from "@/lib/auth-client";
import type { UserRole } from "@/types";

export const useAuth = () => {
  const { data: session, isPending } = authClient.useSession();
  const storeUser = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);

  useEffect(() => {
    if (isPending) return;

    if (session?.user) {
      setUser({
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        photoURL: session.user.image ?? "",
        role: session.user.role as UserRole,
        credits: session.user.credits,
      });
    } else {
      clearUser();
    }
  }, [session, isPending, setUser, clearUser]);

  return {
    user: storeUser,
    loading: isPending,
    isAuthenticated: !!session?.user,
  };
};

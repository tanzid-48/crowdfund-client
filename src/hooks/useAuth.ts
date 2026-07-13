"use client";

import { useEffect } from "react";

import { useUserStore } from "@/store/useUserStore";
import { authClient } from "@/lib/auth-client";

export const useAuth = () => {
  const { data: session, isPending } = authClient.useSession();
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
        // @ts-expect-error -- additionalFields
        role: session.user.role,
        // @ts-expect-error -- additionalFields
        credits: session.user.credits,
      });
    } else {
      clearUser();
    }
  }, [session, isPending, setUser, clearUser]);

  return {
    user: session?.user ?? null,
    loading: isPending, // এইটাই মূল loading gate
    isAuthenticated: !!session?.user,
  };
};
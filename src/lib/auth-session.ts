import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { UserRole } from "@/types";

export const getSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session;
};

export const requireRole = async (role: UserRole) => {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const userRole = session?.user?.role;
  if (userRole !== role) {
    redirect("/unauthorized");
  }
  return session;
};


export const getUserToken = async () => {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });
  return token || null;
};

export const getAuthHeaders = async () => {
  const token = await getUserToken();
  return {
    authorization: `Bearer ${token}`,
  };
};

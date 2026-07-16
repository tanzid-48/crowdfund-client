import axiosInstance from "@/lib/api/axiosInstance";
import type { UserRole } from "@/types";

export async function updateUserRole(id: string, role: UserRole) {
  const res = await axiosInstance.patch(`/users/${id}/role`, { role });
  return res.data;
}

export async function deleteUser(id: string) {
  const res = await axiosInstance.delete(`/users/${id}`);
  return res.data;
}

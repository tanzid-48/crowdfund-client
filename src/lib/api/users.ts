import axiosInstance from "@/lib/api/axiosInstance";
import type { User } from "@/types";

export interface AdminStats {
  totalSupporters: number;
  totalCreators: number;
  totalCredits: number;
  totalPaymentsProcessed: number;
}

export async function getAdminStats(): Promise<AdminStats> {
  const res = await axiosInstance.get("/users/stats");
  return res.data;
}

export async function getAllUsers(): Promise<User[]> {
  const res = await axiosInstance.get("/users");
  return res.data;
}

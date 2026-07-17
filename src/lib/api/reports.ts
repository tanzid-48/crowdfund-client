import axiosInstance from "@/lib/api/axiosInstance";
import type { Report } from "@/types";

export async function getAllReports(): Promise<Report[]> {
  const res = await axiosInstance.get("/reports");
  return res.data;
}

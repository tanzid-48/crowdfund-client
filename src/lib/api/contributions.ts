import axiosInstance from "@/lib/api/axiosInstance";
import type { Contribution } from "@/types";

export async function getContributionsForCreator(
  creatorEmail: string,
  status?: string,
): Promise<Contribution[]> {
  const params = new URLSearchParams({ creatorEmail });
  if (status) params.set("status", status);
  const res = await axiosInstance.get(`/contributions?${params.toString()}`);
  return res.data;
}

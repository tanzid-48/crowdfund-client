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

export interface SupporterStats {
  totalContributions: number;
  pendingContributions: number;
  totalAmountContributed: number;
  statusBreakdown: { name: string; value: number }[];
}
export async function getSupporterStats(
  email: string,
): Promise<SupporterStats> {
  const res = await axiosInstance.get(`/contributions/stats?email=${email}`);
  return res.data;
}

export async function getApprovedContributions(
  email: string,
): Promise<Contribution[]> {
  const res = await axiosInstance.get(`/contributions/approved?email=${email}`);
  return res.data;
}

export interface PaginatedContributions {
  contributions: Contribution[];
  total: number;
  page: number;
  totalPages: number;
}

export async function getMyContributionsPaginated(
  email: string,
  page: number,
  limit: number = 5,
): Promise<PaginatedContributions> {
  const res = await axiosInstance.get(
    `/contributions/my-contributions?email=${email}&page=${page}&limit=${limit}`,
  );
  return res.data;
}

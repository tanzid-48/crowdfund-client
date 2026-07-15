import axiosInstance from "@/lib/api/axiosInstance";
import type { Contribution } from "@/types";

interface CreateContributionPayload {
  campaign_id: string;
  campaign_title: string;
  contribution_amount: number;
  supporter_email: string;
  supporter_name: string;
  creator_name: string;
  creator_email: string;
  message?: string;
}

export async function createContribution(
  payload: CreateContributionPayload,
): Promise<Contribution> {
  const res = await axiosInstance.post("/contributions", payload);
  return res.data;
}

export async function approveContribution(id: string) {
  const res = await axiosInstance.patch(`/contributions/${id}/approve`);
  return res.data;
}

export async function rejectContribution(id: string) {
  const res = await axiosInstance.patch(`/contributions/${id}/reject`);
  return res.data;
}

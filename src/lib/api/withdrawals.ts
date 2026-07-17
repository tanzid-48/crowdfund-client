import axiosInstance from "@/lib/api/axiosInstance";
import type { Withdrawal } from "@/types";

export async function getAvailableCredits(email: string): Promise<{
  availableCredits: number;
  totalRaised: number;
  totalWithdrawn: number;
}> {
  const res = await axiosInstance.get(
    `/withdrawals/available-credits?email=${email}`,
  );
  return res.data;
}

export async function getWithdrawalsForCreator(
  email: string,
): Promise<Withdrawal[]> {
  const res = await axiosInstance.get(`/withdrawals?email=${email}`);
  return res.data;
}

export async function getPendingWithdrawals(): Promise<Withdrawal[]> {
  const res = await axiosInstance.get("/withdrawals/pending");
  return res.data;
}

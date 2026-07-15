import axiosInstance from "@/lib/api/axiosInstance";
import type { WithdrawalFormValues } from "@/schemas/withdrawal.schema";

interface CreateWithdrawalPayload extends WithdrawalFormValues {
  creator_email: string;
  creator_name: string;
}

export async function createWithdrawal(payload: CreateWithdrawalPayload) {
  const res = await axiosInstance.post("/withdrawals", payload);
  return res.data;
}

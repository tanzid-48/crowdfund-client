import axiosInstance from "@/lib/api/axiosInstance";

interface SavePaymentPayload {
  email: string;
  amount: number;
  transactionId: string;
}

export async function savePayment(payload: SavePaymentPayload) {
  const res = await axiosInstance.post("/payments", payload);
  return res.data;
}

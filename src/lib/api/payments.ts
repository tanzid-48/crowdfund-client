import axiosInstance from "@/lib/api/axiosInstance";
import type { Payment } from "@/types";

export async function createPaymentIntent(
  amount: number,
): Promise<{ clientSecret: string }> {
  const res = await axiosInstance.post("/payments/create-payment-intent", {
    amount,
  });
  return res.data;
}

export async function getPaymentsForUser(email: string): Promise<Payment[]> {
  const res = await axiosInstance.get(`/payments?email=${email}`);
  return res.data;
}

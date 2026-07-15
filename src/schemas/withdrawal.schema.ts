import { z } from "zod";

export const withdrawalSchema = z.object({
  withdrawal_credit: z.number().positive("Enter a valid amount"),
  payment_system: z.enum(["stripe", "bkash", "rocket", "nagad"], {
    message: "Select a payment method",
  }),
  account_number: z.string().min(5, "Enter a valid account number"),
});

export type WithdrawalFormValues = z.infer<typeof withdrawalSchema>;

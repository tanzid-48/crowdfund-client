import { z } from "zod";

export const contributionSchema = z.object({
  contribution_amount: z
    .number({ message: "Enter a valid amount" })
    .positive("Amount must be greater than 0"),
  message: z
    .string()
    .max(300, "Message must be under 300 characters")
    .optional(),
});

export type ContributionFormValues = z.infer<typeof contributionSchema>;

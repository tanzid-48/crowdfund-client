import { z } from "zod";

export const campaignSchema = z.object({
  campaign_title: z.string().min(5, "Title must be at least 5 characters"),
  campaign_story: z.string().min(50, "Story must be at least 50 characters"),
  category: z.string().min(1, "Select a category"),
  funding_goal: z.number().positive("Funding goal must be greater than 0"),
  minimum_contribution: z
    .number()
    .positive("Minimum contribution must be greater than 0"),
  deadline: z.string().min(1, "Select a deadline"),
  reward_info: z.string().optional(),
  campaign_image_url: z.string().url("Upload an image first"),
});

export type CampaignFormValues = z.infer<typeof campaignSchema>;

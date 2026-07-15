import axiosInstance from "@/lib/api/axiosInstance";
import type { CampaignFormValues } from "@/schemas/campaign.schema";

interface CreateCampaignPayload extends CampaignFormValues {
  creator_name: string;
  creator_email: string;
}

export async function createCampaign(payload: CreateCampaignPayload) {
  const res = await axiosInstance.post("/campaigns", payload);
  return res.data;
}

export async function updateCampaign(
  id: string,
  payload: Pick<
    CampaignFormValues,
    "campaign_title" | "campaign_story" | "reward_info"
  >,
) {
  const res = await axiosInstance.patch(`/campaigns/${id}`, payload);
  return res.data;
}

export async function deleteCampaign(id: string) {
  const res = await axiosInstance.delete(`/campaigns/${id}`);
  return res.data;
}
